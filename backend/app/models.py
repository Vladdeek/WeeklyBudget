from sqlalchemy import Column, Integer, String, ForeignKey #ForeignKey будет ссылаться на поле из другой таблицы 
from sqlalchemy.orm import relationship # для создания связи между полями 
from .database import Base # все наше подключение которое которое на основе наших моделей создает таблицы в БД

#
class Expense(Base):
    __tablename__ = "Expense"

    id = Column(Integer, primary_key=True, index=True)# index=True - поиск по этому столбцу
    expense = Column(Integer)
    day_id = Column(Integer, index=True)

    # Связь с моделью Users
    #user = relationship("User", back_populates="todos")  # Связь с задачами пользователя



#User
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)# index=True - поиск по этому столбцу
    name = Column(String)
    password = Column(String)

   #todos = relationship("Todo", back_populates="user")  # Связь с задачами пользователя



# Этот файл описывает каждую табличку для БД
# на основе этого файла на основе этих классов 
# будут созданы разные таблицы в БД