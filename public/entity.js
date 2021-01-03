class Hero {
    constructor(){
        this.gold = 0;
        this.items = [];
        this.buildings = [];
    }

    set_status(life, damage, defense, armor, initialMana, totalMana){
        this.life = life;
        this.totalLife = life;

        this.damage = damage;
        this.defense = defense;
        this.armor = armor;

        this.initialMana = initialMana;
        this.totalMana = totalMana;
    }

}

class Mage extends Hero {
    constructor(){
        this.name = 'Mage';
        this.color = 'rgb(35, 168, 242)';

        this.stepMove = 24;
        this.size = 40;

        this.set_status(550, 10, 35, 0, 50, 100);
        
        this.skills = ['MageSkills-Q', 'MageSkills-E', 'MageSkills-R'];
        this.cooldown = [0,6,7];
        this.skillsManaCost = [0, 100, 100];
    }


}

class Tank extends Hero {
    constructor(){
        this.name = 'Tank';
        this.color = 'rgb(153, 102, 71)';
        
        this.stepMove = 24;
        this.size = 40;

        this.set_status(1000, 65, 25, 30, 10, 50);

        this.skills = ['MageSkills-Q', 'MageSkills-E', 'MageSkills-R'];
        this.cooldown = [2, 6, 7];
        this.skillsManaCost = [0, 10, 100];
    }

}

class God extends Hero {
    constructor(){
        this.name = 'God';
        this.color =  'rgb(246, 189, 3)';

        this.stepMove = 24;
        this.size = 40;

        this.set_status(1500, 150, 55, 30, 150, 150);

        this.skills = ['MageSkills-Q', 'MageSkills-E', 'MageSkills-R'];
        this.cooldown = [0,0,0];
        this.skillsManaCost = [0,0,0];
    }
}
