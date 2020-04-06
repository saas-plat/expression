import * as AggregatesUtil  from '../src/AggregatesUtil';
import {expect} from 'chai';

describe('聚合函数', () => {

  it('SUM ', () => {
    expect(AggregatesUtil.sum([1,2,3])).equal(6);
    expect(AggregatesUtil.sum([{a:1},{a:2},{a:3}],'a')).equal(6);
    expect(AggregatesUtil.sum({a:1})).to.be.NaN;
    expect(AggregatesUtil.sum()).to.be.NaN;
    expect(AggregatesUtil.sum(null)).to.be.NaN;
    expect(AggregatesUtil.sum('aaaa')).to.be.NaN;
    expect(AggregatesUtil.sum('1')).equal(1);
  })

  it('MIN', () => {
    expect(AggregatesUtil.min([1,2,3])).equal(1);
    expect(AggregatesUtil.min([{a:1},{a:2},{a:3}],'a')).equal(1);
    expect(AggregatesUtil.min({a:1})).to.be.NaN;
    expect(AggregatesUtil.min()).to.be.NaN;
    expect(AggregatesUtil.min(null)).to.be.NaN;
    expect(AggregatesUtil.min('aaaa')).to.be.NaN;
    expect(AggregatesUtil.min('1')).equal(1);
  })

  it('MAX', () => {
    expect(AggregatesUtil.max([1,2,3])).equal(3);
    expect(AggregatesUtil.max([{a:1},{a:2},{a:3}],'a')).equal(3);
    expect(AggregatesUtil.max({a:1})).to.be.NaN;
    expect(AggregatesUtil.max()).to.be.NaN;
    expect(AggregatesUtil.max(null)).to.be.NaN;
    expect(AggregatesUtil.max('aaaa')).to.be.NaN;
    expect(AggregatesUtil.max('1')).equal(1);
  })

  it('COUNT', () => {
    expect(AggregatesUtil.count([1,2,3])).equal(3);
    expect(AggregatesUtil.count([{a:1},{a:2},{a:3}],'a')).equal(3);
    expect(AggregatesUtil.count({a:1})).equal(1);
    expect(AggregatesUtil.count()).equal(0);
    expect(AggregatesUtil.count(null)).equal(1);
    expect(AggregatesUtil.count('aaaa')).equal(1);
    expect(AggregatesUtil.count('1')).equal(1);

    expect(AggregatesUtil.count([1,2,undefined,3])).equal(3);
    expect(AggregatesUtil.count([{a:1},{a:2},{b:1},{a:3}],'a')).equal(3);
  })

})
