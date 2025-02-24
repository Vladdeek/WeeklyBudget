from pydantic import BaseModel


#Expense
class ExpenseBase(BaseModel):
    expense: int
    day_id: int

class ExpenseCreate(ExpenseBase):
    pass

class Expense(ExpenseBase):
    id: int
    class Config:
        orm_mode = True

    

#User 
class UserBase(BaseModel):
    name: str
    password: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    class Config:
        orm_mode = True 


# Здесь описаны различные схемы,
# нужны для описания API
# нужны для описания того что мы будем принимать
# и что мы будем принимать 
