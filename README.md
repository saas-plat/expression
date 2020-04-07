# expression

简单表达式语法
语法参照 https://github.com/antlr/grammars-v4/blob/master/javascript

```
singleExpression
   : singleExpression '.' ID '(' expressionSequence ')'                     # FunctionInvokeExpression
   | singleExpression '[' expressionSequence ']'                            # MemberIndexExpression
   | singleExpression '.' ID                                                # MemberDotExpression
   | '~' singleExpression                                                   # UnaryExpression
   | '!' singleExpression                                                   # UnaryExpression
   | singleExpression 'in' singleExpression                                 # BinaryExpression
   | singleExpression ( '*' | '/' | '%' ) singleExpression                  # BinaryExpression
   | singleExpression ( '+' | '-' ) singleExpression                        # BinaryExpression
   | singleExpression ( '<<' | '>>' | '>>>' ) singleExpression              # BinaryExpression
   | singleExpression ( '<' | '>' | '<=' | '>=' ) singleExpression          # BinaryExpression
   | singleExpression ( '==' | '!=' /*| '===' | '!=='*/ ) singleExpression   # BinaryExpression
   | singleExpression '&' singleExpression                                  # BinaryExpression
   | singleExpression '^' singleExpression                                  # BinaryExpression
   | singleExpression '|' singleExpression                                  # BinaryExpression
   | singleExpression '&&' singleExpression                                 # BinaryExpression
   | singleExpression '||' singleExpression                                 # BinaryExpression
   | singleExpression '?' singleExpression ':' singleExpression             # TernaryExpression
   | GLOBAL_OBJECT                                                          # InternalExpression
   | CONTEXT_OBJECT                                                         # IdentifierExpression
   | VALUE                                                                  # LiteralExpression
   | objectLiteral                                                          # ObjectLiteralExpression
   | '(' expressionSequence ')'                                             # ParenthesizedExpression
   ;
```