from fastapi import FastAPI, HTTPException, Path, Query, Body, Depends
from typing import Optional, List, Dict, Annotated
from sqlalchemy.orm import Session
from sqlalchemy import func 
from passlib.context import CryptContext # библиотека для ХЕША паролей 

#импорт наших классов
from .models import Base, Expense, User
from .database import engine, session_local
from .schemas import ExpenseCreate, Expense as DbExpense, UserCreate, User as DbUser


app = FastAPI()

# Импортируем CORSMiddleware для разрешения кросс-доменных запросов
# CORS (Cross-Origin Resource Sharing) нужно, чтобы фронтенд с другого домена/порта мог отправлять запросы на наш сервер
from fastapi.middleware.cors import CORSMiddleware

# Разрешаем все источники для теста
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешаем все источники
    allow_credentials=True,
    allow_methods=["*"],  # Разрешаем все методы (GET, POST, и т.д.)
    allow_headers=["*"],  # Разрешаем все заголовки
)

Base.metadata.create_all(bind=engine)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto") #Настройка контекста для bcrypt


# функция ХЕШИРОВАНИЯ 
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# Функция для проверки пароля
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)



# функция создает сессию для подключения к ДБ
def get_db():
    db = session_local()
    try:
        yield db 
    finally:
        db.close()

@app.post("/expense/", response_model=DbExpense)
async def create_expense(expense: ExpenseCreate, db: Session = Depends(get_db)) -> DbExpense:   
    # Получаем id дня из запроса (должно быть передано вместе с задачей)
    day_id = expense.day_id

    # Создаем объект задачи
    db_expense = Expense(expense=expense.expense, day_id=day_id)

    # Добавляем задачу в базу данных
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)

    return db_expense

@app.get("/expense/", response_model=List[DbExpense])
async def get_expense_by_day(day_id: int, db: Session = Depends(get_db)):
    # Фильтруем задачи по индексу дня
    return db.query(Expense).filter(Expense.day_id == day_id).all()

from fastapi import HTTPException

@app.get("/expensesum/", response_model=int)
async def get_expense_sum(day_id: int, db: Session = Depends(get_db)):
    total = db.query(func.sum(Expense.expense)).filter(Expense.day_id == day_id).scalar()
    if total is None:
        raise HTTPException(status_code=404, detail="No expenses found for this day")
    return total


@app.delete("/expense/{id}")
async def delete_expense(id: int, db: Session = Depends(get_db)):
    expense = db.query(Expense).filter(Expense.id == id).first()
    if expense is None:
        raise HTTPException(status_code=404, detail="Задача не найдена")
    
    db.delete(expense)
    db.commit()
    return {"message": f"Задача с id {id} была удалена"}


# Вывод всех данных
@app.get("/allexpense/", response_model=List[DbExpense])
async def expense(db: Session = Depends(get_db)):
    expenses = db.query(Expense).all()  # Получаем все задачи
    return expenses  # Возвращаем задачи



#Регистрация авторизация
@app.post("/users/", response_model=DbUser)
async def create_user(user: UserCreate, db: Session = Depends(get_db)) -> DbUser:   
     # Проверяем, есть ли уже пользователь с таким именем
    existing_user = db.query(User).filter(User.name == user.name).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Пользователь уже существует")  
    
    # Хешируем пароль
    hashed_password = hash_password(user.password)
    
    # Создаем пользователя с хешированным паролем
    db_user = User(name=user.name, password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


# Дополнительный маршрут, который будет проверять, существует ли пользователь
# Этот эндпоинт вернет {"exists": True}, если пользователь есть, и 404, если его нет.
@app.get("/users/{name}")
async def check_user(name: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.name == name).first()
    if user:
        return {"exists": True}
    raise HTTPException(status_code=404, detail="Пользователь не найден")


# Эндпоинт авторизации
@app.post("/auth/")
async def auth_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.name == user.name).first()

    if not db_user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")

    if not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Неверный пароль")

    return {"message": "Успешный вход", "user": db_user.name}


# Вывод всех данных
@app.get("/users/", response_model=List[DbUser])
async def users(db: Session = Depends(get_db)):
    return db.query(User).all()