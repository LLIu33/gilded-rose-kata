import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Type: BASIC', () => {
    it('should add new item', () => {
        const gildedRose = new GildedRose([ new Item('basic', 0, 0) ]);
        const added = gildedRose.items[0]
        expect(added.name).to.equal('basic');
        expect(added.quality).to.equal(0);
        expect(added.sellIn).to.equal(0);
    });

    it('should update quality for sellin 1 day', () => {
        const gildedRose = new GildedRose([ new Item('basic', 1, 1) ]);
        const result = gildedRose.updateQuality();
        expect(result[0].quality).to.equal(0);
        expect(result[0].sellIn).to.equal(0);
    });

    it('should update quality 2x as fast for sellin 0 days', () => {
        const gildedRose = new GildedRose([ new Item('basic', 0, 4) ]);
        const result = gildedRose.updateQuality();
        expect(result[0].quality).to.equal(2);
        expect(result[0].sellIn).to.equal(-1);
    });

    it('item quality should never be negative', () => {
        const gildedRose = new GildedRose([ new Item('basic', 0, 1) ]);
        const result = gildedRose.updateQuality();
        expect(result[0].quality).to.equal(0);
        expect(result[0].sellIn).to.equal(-1);
    });
});

describe('Type: AGED BRIE', () => {
    it('Aged Brie should increases in quality the older it gets', () => {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 1, 1) ]);
        const result = gildedRose.updateQuality();
        expect(result[0].quality).to.equal(2);
        expect(result[0].sellIn).to.equal(0);
    });
    
    it('quality of aged brie should never go above 50', () => {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 1, 50) ]);
        const result = gildedRose.updateQuality();
        expect(result[0].quality).to.equal(50);
        expect(result[0].sellIn).to.equal(0);
    });

    it('should allow quality of aged brie to be incremented with negative sellIn', () => {
        const gildedRose = new GildedRose([ new Item('Aged Brie', -5, 5) ]);
        const result = gildedRose.updateQuality();
        expect(result[0].quality).to.equal(7);
        expect(result[0].sellIn).to.equal(-6);
    });
});

describe('Type: SULFURAS', () => {
    it('should not change quality for sulfuras', () => {
        const gildedRose = new GildedRose([ new Item('Sulfuras, Hand of Ragnaros', 1, 1) ]);
        const result = gildedRose.updateQuality();
        expect(result[0].quality).to.equal(1);
        expect(result[0].sellIn).to.equal(1);
    });

    it('should not change sellin for sulfuras', () => {
        const gildedRose = new GildedRose([ new Item('Sulfuras, Hand of Ragnaros', -5, 30) ]);
        const result = gildedRose.updateQuality();
        expect(result[0].quality).to.equal(30);
        expect(result[0].sellIn).to.equal(-5);
    });
});

describe('Type: BACKSTAGE PASSES', () => {
    it('should increase quality of backstage passes by 1', () => {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 1, 1) ]);
        const result = gildedRose.updateQuality();
        expect(result[0].quality).to.equal(4);
        expect(result[0].sellIn).to.equal(0);
    });

    it('should increase quality of backstage passes by 2 when more than 5 days remaining', () => {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 6, 1) ]);
        const result = gildedRose.updateQuality();
        expect(result[0].quality).to.equal(3);
        expect(result[0].sellIn).to.equal(5);
    });

    it('should increase quality of backstage passes by 1 when more than 10 days remaining', () => {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 11, 1) ]);
        const result = gildedRose.updateQuality();
        expect(result[0].quality).to.equal(2);
        expect(result[0].sellIn).to.equal(10);
    });

    it('should drops quality to 0 after the concert', () => {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10) ]);
        const result = gildedRose.updateQuality();
        expect(result[0].quality).to.equal(0);
        expect(result[0].sellIn).to.equal(-1);
    });
});
