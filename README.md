# Calculadora
<br />
**Pros&Cons:**
<br />
(+) A calculadora responde àos botões do teclado.<br />
(-) Ainda é preciso limitar a quantidade de caracteres em parte inteira dos números introduzidos. Depois de 16 caracteres pode dar erro. Os caracteres seguintes apresentam-se como 0.<br />
<br />
**Informação adicional:**
<br />
A calculadora tem a seguinte lógica: as botóes + - / * desempenham a função "=" em alguns casos:<br />
quando chamados logo depois de um deles sem indtroduzir algum número. <br />
Exemplos: <br />
```
6-+ => 6+ (ou seja: 6-0=6 => 6+)
6*+ => 0+ (ou seja: 6*0=0 => 0+)
6/+ => not a number (ou seja: 6/0=not a number)
```
