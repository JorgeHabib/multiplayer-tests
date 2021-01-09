import MageSkills from './skills/mage.js';
import TankSkills from './skills/tank.js';
import GodSkills from './skills/god.js';

export function createClasses(){
    const classes = {
        mage : new Mage(),
        tank : new Tank(),
        god : new God()
    }

    return classes;
}

class Hero{
    constructor(){
        this.gold = 0;
    }

    set_stats(health, attack, defense, mana, cooldown){
        this.health = health;
        this.totalHealth = health;

        this.attack = attack;
        this.defense = defense;
        
        this.mana = mana;
        this.totalMana = mana;

        this.cooldown = cooldown;
    }
}

class Mage extends Hero {
    constructor(){
        super.set_stats();
        this.color = 'rgb(35, 168, 242)';
        this.skills = MageSkills;
    }
}

class Tank extends Hero {
    constructor(){
        super.set_stats();
        this.color = 'rgb(153, 102, 71)';
        this.skills = TankSkills;
    }
}

class God extends Hero {
    constructor(){
        super.set_stats();
        this.color = 'rgb(246, 189, 3)';
        this.skills = GodSkills;
    }
}