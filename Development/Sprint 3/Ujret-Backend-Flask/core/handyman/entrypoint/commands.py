"""Commands for the handypam entrypoint."""
from typing import Optional, Tuple
from typing import List, Set
from random import randint
from datetime import datetime
from core.entrypoint.uow import AbstractUnitOfWork
from core.handyman.domain import model as handy_mdl
from core.handyman.adapters.utils import map_subcategories_from_string


def create_handyman(
        id: str,
        user_id: str,
        category: handy_mdl.HandymanCategory,
        sub_categories: List[str],
        about: str,
        address: str,
        status: bool,
        uow: AbstractUnitOfWork,
) -> handy_mdl.Handyman:
    """create handyman command"""
    category = handy_mdl.HandymanCategory[category]
    subs = sub_categories.split(',')
    subs = map_subcategories_from_string(category, subs)

    handyman = handy_mdl.Handyman(
        id=id,
        user_id=user_id,
        category=category,
        sub_categories=subs,
        about=about,
        address=address,
        status=status,
    )

    uow.handymen.add(handyman)


def update_handyman(
    user_id: str,
    handyman_info: dict,
    uow: AbstractUnitOfWork,
):
    handyman = uow.handymen.get(user_id=user_id)
    handyman.update_handyman(handyman_info=handyman_info)
    uow.handymen.save(handyman=handyman)
    return 200, handyman, True


def create_task(
        id: str,
        user_id: str,
        category: handy_mdl.HandymanCategory,
        sub_categories: List[str],
        description: str,
        address: str,
        budget: int,
        duration: int,
        date: datetime,
        time: datetime,
        status: handy_mdl.TaskStatus,
        handyman_status: Optional[handy_mdl.TaskStatus],
        uow: AbstractUnitOfWork,
):
    """create task command"""

    category = handy_mdl.HandymanCategory[category]
    print(category)
    subs = sub_categories.split(',')
    subs = map_subcategories_from_string(category, subs)

    task = handy_mdl.Task(
        id=id,
        user_id=user_id,
        handyman_id=None,
        category=category,
        sub_categories=subs,
        description=description,
        address=address,
        budget=budget,
        duration=duration,
        date=date,
        time=time,
        bids={},
        status=status,
        handyman_status=handyman_status,
    )

    uow.tasks.add(task)


def bid_task(
        id: str,
        task_id: str,
        handyman_id: str,
        amount: int,
        description: str,
        uow: AbstractUnitOfWork,
) -> handy_mdl.Bid:
    task: handy_mdl.Task = uow.tasks.get(task_id=task_id)

    task.bid_task(id=id, handyman_id=handyman_id, amount=amount, description=description)

    uow.tasks.save(task=task)
    return 200, task.bids[handyman_id], True

def accept_bid(
        task_id: str,
        handyman_id: str,
        uow: AbstractUnitOfWork,
) -> None:
    task: handy_mdl.Task = uow.tasks.get(task_id=task_id)

    task.accept_bid(handyman_id=handyman_id)

    uow.tasks.save(task=task)
    return 200, task, True

def complete_task(
        task_id: str,
        uow: AbstractUnitOfWork,
) -> None:
    task: handy_mdl.Task = uow.tasks.get(task_id=task_id)

    task.complete_task()

    uow.tasks.save(task=task)
    return 200, task, True

def complete_task_handyman(
        task_id: str,
        uow: AbstractUnitOfWork,
) -> None:
    task: handy_mdl.Task = uow.tasks.get(task_id=task_id)

    task.complete_task_handyman()

    uow.tasks.save(task=task)
    return 200, task, True
