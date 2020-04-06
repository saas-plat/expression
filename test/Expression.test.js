import Expression  from '../src';
import {expect} from 'chai';

describe('表达式', () => {

  it('支持常用的数值、字符串、布尔、null', () => {
    const expr = new Expression('"it1"');
    expect(expr.exec({})).equal('it1');

    const expr2 = new Expression("'it1'");
    expect(expr2.exec()).equal('it1');

    const expr3 = new Expression("'it'+'100'");
    expect(expr3.exec()).equal('it100');

    const expr4 = new Expression("10");
    expect(expr4.exec()).equal(10);

    const expr5 = new Expression("null");
    expect(expr5.exec()).equal(null);

    const expr6 = new Expression("false");
    expect(expr6.exec()).equal(false);
  })

  // 这里和单值表达式词法冲突，解决方法未找到
  // it('支持便捷的无引号的字符串常量，以=开头', () => {
  //   const expr = new Expression('={it1:$aaa}');
  //   expect(expr.exec()).equal('{it1:$aaa}');
  // })

  it('支持基本逻辑运算', () => {
    const expr = new Expression('$a+$b');
    const obj = {
      a: 100,
      b: 'aaaa'
    };
    expect(expr.exec(obj)).equal('100aaaa');
  })

  it('支持系统对象now,Math,Date', () => {
    const expr = new Expression('now');
    expr.exec();
    //expect(expr.exec( )).equal();
  })

  it('支持映射表达式{a:xxx,b:xxx,...}', () => {
    const expr = new Expression('{a:$a*2,[$b]:$b+"aa",d:10,c:"text value"}');
    const obj = {
      a: 100,
      b: 'aaaa'
    };
    expect(expr.exec(obj)).deep.equal({
      a: 200,
      aaaa: 'aaaaaa',
      c: "text value",
      d: 10
    });
  })

  it('聚合表达式', () => {
    const expr = new Expression('Aggs.sum($val,"a")');
    expect(expr.exec({val:[{a:1},{a:2},{a:3}]})).equal(6);

    const expr2 = new Expression('Aggs.max($val,"a")');
    expect(expr2.exec({val:[{a:1},{a:2},{a:3}]})).equal(3);
  })
})
