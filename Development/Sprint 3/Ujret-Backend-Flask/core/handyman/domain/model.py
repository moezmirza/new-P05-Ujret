"""
Handyman Domain Model
- Define Handyman Categories
- Create Tasks
"""
from random import randint
from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum
from typing import Dict, Optional, Tuple, Set, List
from uuid import uuid4


class HandymanCategory(str, Enum):
    """Handyman Category Enum"""
    PLUMBER = 1
    ELECTRICIAN = 2
    CARPENTER = 3
    PAINTER = 4
    TAILOR = 5
    SHIFTING = 6
    COOK = 7
    MASON = 8
    HVAC = 9
    VEHICLE_MECHANIC = 10
    VEHICLE_ELECTRICIAN = 11
    HOUSE_HELP = 12
    CAR_WASHER = 13
    DRIVERS = 14
    BABYSITTERS = 15
    DOCTORS = 16
    REAL_ESTATE_AGENTS = 17


class PlumberCategory(str, Enum):
    """Plumber Category Enum"""
    WATER_LINE_REPAIR = 1
    DRAIN_CLEANING = 2
    WATER_TANK_INSTALLATION = 3
    FAUCET_INSTALLATION = 4


class ElectricianCategory(str, Enum):
    """Electrician Category Enum"""
    WIRING = 1
    UPS_INSTALLATION = 2
    SOLAR_PANEL_INSTALLATION = 3
    BREAKER_BOX_INSTALLATION = 4


class CarpenterCategory(str, Enum):
    """Carpenter Category Enum"""
    FURNITURE_REPAIR = 1
    FURNITURE_INSTALLATION = 2
    DOOR_REPAIR = 3
    DOOR_INSTALLATION = 4


class PainterCategory(str, Enum):
    """Painter Category Enum"""
    WALL_PAINTING = 1
    FURNITURE_PAINTING = 2
    WALLPAPER_INSTALLATION = 3
    WALLPAPER_REMOVAL = 4


class TailorCategory(str, Enum):
    """Tailor Category Enum"""
    CLOTHING_ALTERATION = 1
    DRESSMAKING = 2
    EMBROIDERY = 3
    TAILORING = 4


class ShiftingCategory(str, Enum):
    """Shifting Category Enum"""
    RESIDENTIAL_SHIFTING = 1
    COMMERCIAL_SHIFTING = 2
    INTERCITY_SHIFTING = 3
    PACKING = 4
    UNPACKING = 5


class CookCategory(str, Enum):
    """Cook Category Enum"""
    HOME_COOKING = 1
    EVENT_CATERING = 2
    PERSONAL_CHEF = 3
    BAKING = 4


@dataclass
class Handyman():
    """Handyman can perform tasks"""
    id: str
    user_id: str
    category: HandymanCategory
    sub_categories: Set
    about: str
    address: str
    status: bool

    def update_handyman(self, handyman_info: Dict) -> None:
        """Update Handyman Attributes"""
        for key, value in handyman_info.items():
            if hasattr(self, key):
                setattr(self, key, value)



class BidStatus(str, Enum):
    """Bid Status Enum"""
    PENDING = 1
    ACCEPTED = 2
    REJECTED = 3

@dataclass(frozen=True)
class Bid():
    """Bid Entity"""
    id: str
    amount: int
    description: str
    status: BidStatus

class TaskStatus(str, Enum):
    """Task Status Enum"""
    PENDING = 1
    ACCEPTED = 2
    COMPLETED = 3
    CANCELLED = 4

@dataclass
class Task():
    """Task Entity"""
    id: str
    user_id: str
    handyman_id: str
    category: HandymanCategory
    sub_categories: Set
    description: str
    address: str
    budget: int
    duration: int
    date: datetime
    time: datetime
    status: TaskStatus
    handyman_status: TaskStatus
    bids: Dict[str, Bid]

    def create_task(self) -> None:
        """Create Task"""
        self.status = TaskStatus.PENDING

    def bid_task(self, handyman_id: str, id: str, amount: int, description:str) -> None:
        """Bid Task"""
        if self.status != TaskStatus.PENDING:
            raise Exception("A bid only may be placed on a pending task.")

        if handyman_id in self.bids:
            raise Exception("Bid already exists")

        self.bids[handyman_id] = Bid(id=id, amount=amount, description=description, status=BidStatus.PENDING)

    def accept_bid(self, handyman_id: str) -> None:
        """Accept Bid"""
        if self.status != TaskStatus.PENDING:
            raise Exception("A bid only may be accepted for a pending task.")

        if handyman_id not in self.bids:
            raise Exception("Bid does not exist")

        self.status = TaskStatus.ACCEPTED
        self.handyman_status = TaskStatus.ACCEPTED
        self.handyman_id = handyman_id

    def cancel_task(self) -> None:
        """Cancel Task"""
        pass

    def accept_task(self) -> None:
        """Accept Task"""
        pass

    def complete_task(self) -> None:
        """Complete Task"""
        if self.status != TaskStatus.ACCEPTED:
            raise Exception("A task only may be completed after it has been accepted.")
        
        self.status = TaskStatus.COMPLETED

    def complete_task_handyman(self) -> None:
        """Complete Task Handyman"""
        if self.handyman_status != TaskStatus.ACCEPTED:
            raise Exception("A task only may be completed by a handyman after it has been accepted.")
        
        self.handyman_status = TaskStatus.COMPLETED

