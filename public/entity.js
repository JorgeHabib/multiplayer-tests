class Hero {
    constructor(){
        this.initialGold = 0;
        this.itens = [];
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

export class Mage extends Hero {
    constructor(){
        super();

        this.name = 'Mage';
        this.color = 'rgb(35, 168, 242)';

        this.stepMove = 24;
        this.side = 40;

        this.set_status('550', 10, 35, 0, 50, 100);
        
        this.skills = ['MageSkills-Q', 'MageSkills-E', 'MageSkills-R'];
        this.coolDown = [0,6,7];
        this.skillsManaCost = [0, 100, 100];
    }


}

export class Tank extends Hero {
    constructor(){
        super();

        this.name = 'Tank';
        this.color = 'rgb(153, 102, 71)';
        
        this.stepMove = 24;
        this.side = 40;

        this.set_status('1000', 65, 25, 30, 10, 50);

        this.skills = ['MageSkills-Q', 'MageSkills-E', 'MageSkills-R'];
        this.coolDown = [2, 6, 7];
        this.skillsManaCost = [0, 10, 100];
    }

}

export class God extends Hero {
    constructor(){
        super();

        this.name = 'God';
        this.color =  'rgb(246, 189, 3)';

        this.stepMove = 24;
        this.side = 40;

        this.set_status('1500', 150, 55, 30, 150, 150);

        this.skills = ['MageSkills-Q', 'MageSkills-E', 'MageSkills-R'];
        this.coolDown = [0,0,0];
        this.skillsManaCost = [0,0,0];
    }
}
