from typing import List

from core.entrypoint.uow import AbstractUnitOfWork
from core.handyman.entrypoint import view_models as handy_vm
from core.handyman.domain import model as handy_mdl
from core.handyman.adapters.utils import map_subcategories


def get_handyman_categories(uow: AbstractUnitOfWork):
    sql = """
        SELECT unnest(enum_range(NULL::task_category_enum))
    """

    uow.dict_cursor.execute(sql)
    categories = uow.dict_cursor.fetchall()

    print(categories)

    return [handy_vm.HandymanCategoriesDTO.from_db_dict_row(category) for category in categories]


def get_handyman_subcategories(sub_cat, uow: AbstractUnitOfWork):
    sql = f"SELECT unnest(enum_range(NULL::{sub_cat}_category_enum))"

    uow.dict_cursor.execute(sql)
    categories = uow.dict_cursor.fetchall()

    return [handy_vm.HandymanCategoriesDTO.from_db_dict_row(category) for category in categories]

def get_relevant_available_tasks(
    #category: str,
    #sub_categories: List[str],
    uow: AbstractUnitOfWork,
):
    sql = """
        select
            t.id,
            t.user_id,
            t.handyman_id,
            t.category,
            t.sub_categories,
            t.description,
            t.address,
            t.budget,
            t.duration,
            t.date,
            t.time,
            t.status,
            u.first_name as handyman_name,
            u.phone_number as handyman_number
        from
            tasks t
            inner join users u on u.id = t.user_id
        where
            t.status = 'PENDING'
    """

    #and t.category = %(category)s
    #and t.sub_categories @> %(sub_categories)s

    uow.dict_cursor.execute(sql)
    #uow.dict_cursor.execute(
    #    sql,
    #    {
    #        "category": category,
    #        "sub_categories": sub_categories,
    #    },
    #)
    tasks = uow.dict_cursor.fetchall()

    return [handy_vm.TaskDTO.from_db_dict_row(task) for task in tasks]

def get_handyman(
    user_id: str,
    uow: AbstractUnitOfWork,
):
    sql = """
        select
            h.id,
            h.user_id,
            h.category,
            h.sub_categories,
            h.about,
            h.address,
            h.status
        from
            handymen h
        where
            h.user_id = %(user_id)s
    """

    uow.dict_cursor.execute(sql, {"user_id": user_id})
    handyman_row = uow.dict_cursor.fetchone()

    if handyman_row is None:
        raise Exception("Handyman not found.")

    category = handy_mdl.HandymanCategory[handyman_row["category"]]
    sub_categories = handyman_row["sub_categories"]

    sub_categories_from_model = map_subcategories(category, sub_categories)
    handyman_row["sub_categories"] = sub_categories_from_model

    return handy_vm.HandymanDTO.from_db_dict_row(handyman_row)


def get_task_bids(
    task_id: str,
    uow: AbstractUnitOfWork,
):
    sql = """
        select
            b.amount,
            b.description,
            u.first_name as name,
            u.phone_number as number
        from
            bids b
            inner join handymen h on h.id = b.handyman_id
            inner join users u on u.id = h.user_id
        where
            b.task_id = %(task_id)s
    """

    uow.dict_cursor.execute(sql, {"task_id": task_id})
    bids = uow.dict_cursor.fetchall()

    return [handy_vm.BidDTO.from_db_dict_row(bid) for bid in bids]


def get_bid_status(
    bid_id: str,
    uow: AbstractUnitOfWork,
):
    sql = """
        select 
            status
        from
            bids
        where
            id = %(bid_id)s
    """    

    uow.dict_cursor.execute(sql, {"bid_id": bid_id})

    bid = uow.dict_cursor.fetchone()

    return bid["status"]
