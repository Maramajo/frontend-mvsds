       IDENTIFICATION DIVISION.
       PROGRAM-ID. AATMEXTR.
       ENVIRONMENT DIVISION.
       CONFIGURATION SECTION.
       SPECIAL-NAMES.
                DECIMAL-POINT IS COMMA.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
*******Trata dados recebidos
       01  WS-RECEIVED-DATA      PIC X(256).
       01  WS-OFFSET             PIC S9(8) COMP.
       01  WS-NAME-FOUND         PIC X(1) VALUE 'N'.
           88  NAME-FOUND        VALUE 'Y'.
           88  NAME-NOT-FOUND    VALUE 'N'.
       01  WS-NAME-LENGTH        PIC S9(8) COMP.
*******Formata data
       01  WS-ABSTIME           PIC X(8).

       01  WS-FORMATTED-DATE    PIC X(08).
       01  WS-DATE-FIELDS.
           05  WS-DAY             PIC XX.
           05  WS-MONTH           PIC XX.
           05  WS-YEAR            PIC XX.
       01  WS-FORMATTED-OUT       PIC X(8).
*******Fim de Formata data
       01 WS-CLASS-DEBITO        PIC X(20)   VALUE SPACES.
       01 WS-CLASS-SALDO         PIC X(20)   VALUE SPACES.
       01 WS-CREDITO-TOT-TXT     PIC X(15).
       01 WS-DEBITO-TOT-TXT      PIC X(15).
       01 WS-PTR                 PIC S9(4)   COMP VALUE 1.
       01 WS-RESP                PIC S9(8)   COMP.
       01 WS-RESP2               PIC S9(8)   COMP.
       01 WS-DOC-OUT             PIC X(16).
       01 WS-STATUS              PIC X(50)
                                VALUE 'Extrato gerado com sucesso'.
       01 HEADER-VALUE           PIC X(50).
       01 WS-AUTH                PIC X(50)
               VALUE 'Authorization'.

       01 WS-TITLE.
          05 WS-NAVEGADOR PIC X(16)
               VALUE 'Extrato Bancário'.
       01 WS-NAME                PIC X(40)
               VALUE 'João da Silva'.
       01 WS-DATA                PIC X(10)   VALUE '10/05/2025'.
       01 WS-AGENCIA             PIC X(10)   VALUE '1234'.
       01 WS-CONTA               PIC X(10)   VALUE '987654-3'.
       01 WS-LINHAS              PIC X(24576).
       01 WS-TOTAL-CREDITO-TXT   PIC X(15).
       01 WS-TOTAL-DEBITO-TODO.
          05 WS-SINAL-DEBITO-TXT    PIC X.
          05 WS-TOTAL-DEBITO-TXT    PIC X(14).
       01 WS-SALDO-CLASS         PIC X(20).

       01 WS-SYMBOLLIST.
         05 FILLER             PIC X(13)   VALUE '&naveg='.
         05 WS-naveg-FLD       PIC X(80).
         05 FILLER             PIC X(13)   VALUE '&title='.
         05 WS-TITLE-FLD       PIC X(80).
         05 FILLER             PIC X(13)   VALUE '&name='.
         05 WS-NAME-FLD        PIC X(40).
         05 FILLER             PIC X(13)   VALUE '&data='.
         05 WS-DATA-FLD        PIC X(10).
         05 FILLER             PIC X(13)   VALUE '&agencia='.
         05 WS-AGENCIA-FLD     PIC X(10).
         05 FILLER             PIC X(13)   VALUE '&conta='.
         05 WS-CONTA-FLD       PIC X(10).
         05 FILLER             PIC X(20)
               VALUE '&linhas_extrato='.
         05 WS-LINHAS-FLD      PIC X(24576).
         05 FILLER             PIC X(17)
               VALUE '&saldo_total='.
         05 WS-SALDO-FLD       PIC X(15).
         05 FILLER             PIC X(18)
               VALUE '&credito_total='.
         05 WS-CREDITO-TOT-FLD PIC X(15).
         05 FILLER             PIC X(17)
               VALUE '&debito_total='.
         05 WS-DEBITO-TOT-FLD PIC X(15).
         05 FILLER             PIC X(15)
               VALUE '&saldo_class='.
         05 WS-SALDO-CLASS-FLD PIC X(20).

       01 WS-LINHAS-EXTRATO      PIC X(24576) VALUE SPACES.
       01 WS-LINHAS-ACUM         PIC X(24576) VALUE SPACES.
       01 WS-LINHA-TMP           PIC X(1024).
       01 WS-LINHA-DETALHE       PIC X(1024).
       01 IDX                    PIC S9(4)   COMP VALUE 1.
       01 WS-MODULO              PIC S9(9)   COMP.

       01 WS-TOTAL-CREDITO       PIC S9(7)V99 COMP-3 VALUE 0.
       01 WS-TOTAL-DEBITO        PIC S9(7)V99 COMP-3 VALUE 0.
       01 WS-SALDO-TOTAL         PIC S9(7)V99 COMP-3 VALUE 0.

       01 TEMP-HIST.
          05 TEMP-HIST1 PIC X(38).
          05 TEMP-BR    PIC X(04)  VALUE '<br>'.
          05 TEMP-HIST2 PIC X(38).
       01 EXT-TABELA.
         05 EXT-LINHA          OCCURS 40 TIMES.
                 10 EXT-DATA PIC X(10).
                 10 EXT-HIST PIC X(80).
                 10 EXT-DOC PIC X(10).
********         10 EXT-DETALHE PIC X(40).
                 10 EXT-CREDITO PIC S9(7)V99 COMP-3.
                 10 EXT-DEBITO PIC S9(7)V99 COMP-3.
                 10 EXT-SALDO PIC S9(7)V99 COMP-3.

       01 WS-NUM                 PIC ZZ.ZZZ,ZZ.
       01 WS-NUM7                PIC Z.ZZZ.ZZZ,ZZ.

       01 WS-CREDITO-TXT         PIC X(15).
       01 WS-DEBITO-TODO.
          05 WS-DEBITO-SINAL-TXT    PIC X.
          05 WS-DEBITO-TXT          PIC X(14).

       01 WS-SALDO-TODO.
          05 WS-SALDO-SINAL-TXT  PIC X.
          05 WS-SALDO-TXT        PIC X(14).
***********  CLNTCODEPAGE('1208')

       PROCEDURE DIVISION.
       000-MAIN.
           DISPLAY 'EXTR ANTES DO RECEIVE'.
           EXEC CICS WEB RECEIVE
             INTO(WS-RECEIVED-DATA)
             LENGTH(LENGTH OF WS-RECEIVED-DATA)
             MAXLENGTH(80)
             CLNTCODEPAGE('1208')
             HOSTCODEPAGE('037')
           END-EXEC.
           DISPLAY 'EXTR ANTES GET-DATE  '.
           PERFORM GET-DATE.
           DISPLAY 'EXTR ANTES EXTRACT-NAME'.
           PERFORM EXTRACT-NAME.
           DISPLAY 'EXTR ANTES PREENCHE-TABELA'.
           PERFORM 100-PREENCHE-TABELA.
           DISPLAY 'EXTR ANTES MONTAR-LINHAS  '.
           PERFORM 200-MONTAR-LINHAS-EXTRATO.

           DISPLAY 'EXTR ANTES MOVER-CAMPOS   '.
           MOVE WS-TITLE  TO WS-TITLE-FLD.
           MOVE WS-NAVEGADOR  TO WS-NAVEG-FLD.
           MOVE WS-NAME   TO WS-NAME-FLD.
           MOVE WS-DATA   TO WS-DATA-FLD.
           MOVE WS-AGENCIA TO WS-AGENCIA-FLD.
           MOVE WS-CONTA  TO WS-CONTA-FLD.
           MOVE WS-LINHAS-EXTRATO TO WS-LINHAS-FLD.
           MOVE WS-SALDO-TODO TO WS-SALDO-FLD.
           MOVE WS-TOTAL-CREDITO-TXT TO WS-CREDITO-TOT-FLD.
           MOVE WS-TOTAL-DEBITO-TODO TO WS-DEBITO-TOT-FLD.
           MOVE WS-SALDO-CLASS TO WS-SALDO-CLASS-FLD.

           DISPLAY 'EXTR ANTES DOC CREATE     '.
           EXEC CICS DOCUMENT CREATE
                DOCTOKEN(WS-DOC-OUT)
                TEMPLATE('AATMEXTR')
                SYMBOLLIST(WS-SYMBOLLIST)
                LISTLENGTH(LENGTH OF WS-SYMBOLLIST)
                RESP(WS-RESP)
                RESP2(WS-RESP2)
           END-EXEC

********** * Origem liberada
           MOVE 'Access-Control-Allow-Origin' TO WS-AUTH.
           MOVE '*' TO HEADER-VALUE.
********** MOVE 'http://maramajo.ddns.net' TO HEADER-VALUE.
           EXEC CICS WEB WRITE
                HTTPHEADER(WS-AUTH)
                VALUE(HEADER-VALUE)
                VALUELENGTH(LENGTH OF HEADER-VALUE)
                RESP(WS-RESP)
           END-EXEC.

********** * Métodos liberados
           MOVE 'Access-Control-Allow-Methods' TO WS-AUTH.
           MOVE 'GET, POST, PUT, DELETE, OPTIONS' TO HEADER-VALUE.
           EXEC CICS WEB WRITE
                HTTPHEADER(WS-AUTH)
                VALUE(HEADER-VALUE)
                VALUELENGTH(LENGTH OF HEADER-VALUE)
                RESP(WS-RESP)
           END-EXEC.

********** * Headers permitidos
           MOVE 'Access-Control-Allow-Headers' TO WS-AUTH.
           MOVE 'Content-Type, Authorization' TO HEADER-VALUE.
           EXEC CICS WEB WRITE
                HTTPHEADER(WS-AUTH)
                VALUE(HEADER-VALUE)
                VALUELENGTH(LENGTH OF HEADER-VALUE)
                RESP(WS-RESP)
           END-EXEC.

           MOVE 'OIOIOI' TO HEADER-VALUE.

           DISPLAY 'EXTR ANTES WEB WRITE      '.
           EXEC CICS WEB WRITE
                HTTPHEADER(WS-AUTH)
                VALUE(HEADER-VALUE)
                VALUELENGTH(LENGTH OF HEADER-VALUE)
                RESP(WS-RESP)
           END-EXEC.

           MOVE 'Content-Type'   TO WS-AUTH.
           MOVE 'text/html;charset=ISO-8859-1'     TO HEADER-VALUE.
           EXEC CICS WEB WRITE
                HTTPHEADER(WS-AUTH)
                VALUE(HEADER-VALUE)
                VALUELENGTH(LENGTH OF HEADER-VALUE)
                RESP(WS-RESP)
           END-EXEC.

           DISPLAY 'EXTR ANTES WEB SEND       '.
           EXEC CICS WEB SEND
                CLNTCODEPAGE('819')
                DOCTOKEN(WS-DOC-OUT)
                STATUSCODE(200)
                STATUSTEXT(WS-STATUS)
                RESP(WS-RESP)
                RESP2(WS-RESP2)
           END-EXEC
           DISPLAY ' Mostrando ws-name'
           DISPLAY WS-NAME
           DISPLAY WS-NAME-FLD
           GOBACK.

       100-PREENCHE-TABELA.
*******    *> Linha 1
           MOVE '01/05/2025' TO EXT-DATA(1).
           MOVE 'Saldo anterior****' TO TEMP-HIST1.
           MOVE SPACES               TO TEMP-HIST2.
           MOVE TEMP-HIST TO EXT-HIST(1).
           MOVE SPACES    TO EXT-DOC(1).
           MOVE 0         TO EXT-CREDITO(1).
           MOVE 0         TO EXT-DEBITO(1).
           MOVE 1100      TO EXT-SALDO(1).

*******    *> Linha 2
           MOVE '01/05/2025' TO EXT-DATA(2).
           MOVE 'Test of the Hbank*' TO TEMP-HIST1.
           MOVE 'Dest. Maria do Ceu Cabral' TO TEMP-HIST2.
           MOVE TEMP-HIST TO EXT-HIST(2).
           MOVE '2868669' TO EXT-DOC(2).
           MOVE 0         TO EXT-CREDITO(2).
           MOVE -1000     TO EXT-DEBITO(2).
           COMPUTE  EXT-SALDO(2) = EXT-SALDO(1) +
             (EXT-CREDITO(2) + EXT-DEBITO(2)).

*******    *> Linha 3
           MOVE '01/05/2025' TO EXT-DATA(3).
           MOVE 'Saque Dinheiro Banco 24h' TO TEMP-HIST1.
           MOVE '00047886 03051242' TO TEMP-HIST2.
           MOVE TEMP-HIST TO EXT-HIST(3).
           MOVE '0305201' TO EXT-DOC(3).
*******    MOVE '00047886 03051242' TO EXT-DETALHE(2).
           MOVE 0         TO EXT-CREDITO(3).
           MOVE -1000     TO EXT-DEBITO(3).
           COMPUTE  EXT-SALDO(3) = EXT-SALDO(2) +
             (EXT-CREDITO(3) + EXT-DEBITO(3)).


*******    *> Linha 4
           MOVE '03/05/2025' TO EXT-DATA(4).
           MOVE 'Saque Dinheiro Banco 24h' TO TEMP-HIST1.
           MOVE '00047886 03051244' TO TEMP-HIST2.
           MOVE TEMP-HIST TO EXT-HIST(4).
           MOVE '0305203' TO EXT-DOC(4).
*******    MOVE '00047886 03051244' TO EXT-DETALHE(3).
           MOVE 0         TO EXT-CREDITO(4).
           MOVE -500      TO EXT-DEBITO(4).
           COMPUTE  EXT-SALDO(4) = EXT-SALDO(3) +
             (EXT-CREDITO(4) + EXT-DEBITO(4)).

*******    *> Linha 5
           MOVE '04/05/2025' TO EXT-DATA(5).
           MOVE 'Rentab.invest Facilcred*' TO TEMP-HIST1.
           MOVE SPACES              TO TEMP-HIST2.
           MOVE TEMP-HIST TO EXT-HIST(5).
           MOVE '2298529' TO EXT-DOC(5).
*******    MOVE SPACES    TO EXT-DETALHE(5).
           MOVE 0,04      TO EXT-CREDITO(5).
           MOVE 0         TO EXT-DEBITO(5).
           COMPUTE  EXT-SALDO(5) = EXT-SALDO(4) +
             (EXT-CREDITO(5) + EXT-DEBITO(5)).

*******    *> Linha 6
           MOVE '05/05/2025' TO EXT-DATA(6).
           MOVE 'Pagto Eletron Cobranca  ' TO TEMP-HIST1.
           MOVE 'Condomínio      '  TO TEMP-HIST2.
           MOVE TEMP-HIST TO EXT-HIST(6).
           MOVE '0000225' TO EXT-DOC(6).
*******    MOVE SPACES    TO EXT-DETALHE(6).
           MOVE 0         TO EXT-CREDITO(6).
           MOVE -535,21   TO EXT-DEBITO(6).
           COMPUTE  EXT-SALDO(6) = EXT-SALDO(5) +
             (EXT-CREDITO(6) + EXT-DEBITO(6)).

*******    *> Linha 7
           MOVE '06/05/2025' TO EXT-DATA(7).
           MOVE 'Saque Dinheiro Banco 24h' TO TEMP-HIST1.
           MOVE '00047886 07051252' TO TEMP-HIST2.
           MOVE TEMP-HIST TO EXT-HIST(7).
           MOVE '0705384' TO EXT-DOC(7).
*******    MOVE '00047886 07051252' TO EXT-DETALHE(7).
           MOVE 0         TO EXT-CREDITO(7).
           MOVE -400      TO EXT-DEBITO(7).
           COMPUTE  EXT-SALDO(7) = EXT-SALDO(6) +
             (EXT-CREDITO(7) + EXT-DEBITO(7)).

*******    *> Linha 8
*******    MOVE '07/05/2025' TO EXT-DATA(8).
*******    MOVE 'TED                     ' TO TEMP-HIST1.
*******    MOVE 'Maramajo Inf Ltda' TO TEMP-HIST2.
*******    MOVE TEMP-HIST TO EXT-HIST(8).
*******    MOVE 'PAGAMEN' TO EXT-DOC(8).
*******    MOVE SPACES    TO EXT-DETALHE(8).
*******    MOVE 10000,77  TO EXT-CREDITO(8).
*******    MOVE 0         TO EXT-DEBITO(8).
*******    COMPUTE  EXT-SALDO(8) = EXT-SALDO(7) +
*******      (EXT-CREDITO(8) + EXT-DEBITO(8)).
*******    *> Linha 9
*******    MOVE '    -   '   TO EXT-DATA(9).
*******    MOVE 'TED9                    ' TO TEMP-HIST1.
*******    MOVE 'Maramajo Inf Ltda' TO TEMP-HIST2.
*******    MOVE TEMP-HIST TO EXT-HIST(9).
*******    MOVE 'PAGAMEN' TO EXT-DOC(9).
*******    MOVE SPACES    TO EXT-DETALHE(9).
*******    MOVE 10000,00  TO EXT-CREDITO(9).
*******    MOVE 0         TO EXT-DEBITO(9).
*******    COMPUTE  EXT-SALDO(9) = EXT-SALDO(8) +
*******      (EXT-CREDITO(9) + EXT-DEBITO(9)).
*******    COMPUTE IDX = 10.

*******    *> Linha 10
*******    MOVE '    -   '   TO EXT-DATA(IDX).
*******    MOVE 'TED 10                  ' TO TEMP-HIST1.
*******    MOVE 'Maramajo Inf Ltda' TO TEMP-HIST2.
*******    MOVE TEMP-HIST TO EXT-HIST(IDX).
*******    MOVE 'PAGAMEN' TO EXT-DOC(IDX).
*******    MOVE SPACES    TO EXT-DETALHE(IDX).
*******    MOVE 10000,00  TO EXT-CREDITO(IDX).
*******    MOVE 0         TO EXT-DEBITO(IDX).
*******    COMPUTE  EXT-SALDO(IDX) = EXT-SALDO(IDX - 1) +
*******      (EXT-CREDITO(IDX) + EXT-DEBITO(IDX)).
*******    ADD 1 TO IDX.
*******    *> Linha 11
*******    MOVE '11/05/2025' TO EXT-DATA(IDX).
*******    MOVE 'TED 11                  ' TO TEMP-HIST1.
*******    MOVE 'Maramajo Inf Ltda' TO TEMP-HIST2.
*******    MOVE TEMP-HIST TO EXT-HIST(IDX).
*******    MOVE 'PAGAMEN' TO EXT-DOC(IDX).
*******    MOVE SPACES    TO EXT-DETALHE(IDX).
*******    MOVE 20000,00  TO EXT-CREDITO(IDX).
*******    MOVE 0         TO EXT-DEBITO(IDX).
*******    COMPUTE  EXT-SALDO(IDX) = EXT-SALDO(IDX - 1) +
*******      (EXT-CREDITO(IDX) + EXT-DEBITO(IDX)).
*******    ADD 1 TO IDX.
TIRAR      COMPUTE IDX = 8.

*******    *> Preenche o restante com zeros
           PERFORM 110-PREENCHER-RESTANTE
            VARYING IDX FROM IDX BY 1
            UNTIL IDX > 40.

       110-PREENCHER-RESTANTE.
           DISPLAY 'INDICE - ' IDX.
           MOVE SPACES    TO EXT-DATA(IDX).
           MOVE SPACES    TO EXT-HIST(IDX).
           MOVE SPACES    TO EXT-DOC(IDX).
*******    MOVE SPACES    TO EXT-DETALHE(IDX).
           MOVE 0         TO EXT-CREDITO(IDX).
           MOVE 0         TO EXT-DEBITO(IDX).
           MOVE 0         TO EXT-SALDO(IDX).

       200-MONTAR-LINHAS-EXTRATO.
           MOVE SPACES    TO WS-LINHAS-EXTRATO.
           MOVE SPACES    TO WS-LINHAS-ACUM.
           MOVE SPACES    TO WS-TOTAL-DEBITO-TODO.
           MOVE SPACES    TO WS-DEBITO-TODO.
           MOVE SPACES    TO WS-SALDO-TODO.
           MOVE 1         TO WS-PTR.

           PERFORM 210-PROCESSAR-LINHAS
            THRU 210-PROCESSAR-LINHAS-EXIT
            VARYING IDX FROM 1 BY 1
            UNTIL IDX > 40.

           PERFORM 220-CONVERTE-TOTAIS.

********   MOVE SPACES    TO WS-LINHA-TMP.
********   STRING '<div class="linha-extrato totais">'
********     '<div class="coluna"><b>Totais</b></div>'
********     '<div class="coluna"></div>'
********     '<div class="coluna"></div>'
********     '<div class="coluna text-end"><b>'
********     WS-CREDITO-TOT-TXT '</b></div>'
********     '<div class="coluna text-end"><b>'
********     WS-DEBITO-TOT-TXT '</b></div>'
********     '<div class="coluna text-end '
********     WS-SALDO-CLASS '"><b>'
********            WS-SALDO-TXT '</b></div>'
********     '</div>' DELIMITED BY SIZE
********   INTO WS-LINHA-TMP
********   END-STRING.

********   STRING WS-LINHA-TMP DELIMITED BY SIZE
********     INTO WS-LINHAS-ACUM WITH POINTER WS-PTR
********   END-STRING.

           MOVE WS-LINHAS-ACUM TO WS-LINHAS-EXTRATO.

       210-PROCESSAR-LINHAS.
           IF EXT-DATA(IDX) = SPACES
            GO TO 210-PROCESSAR-LINHAS-EXIT
           END-IF.

           PERFORM 300-CONVERTE-VALORES.

           IF EXT-DEBITO(IDX) < 0
            MOVE ' debito' TO WS-CLASS-DEBITO
           ELSE
            MOVE SPACES TO WS-CLASS-DEBITO
           END-IF.

           IF EXT-SALDO(IDX) < 0
            DISPLAY 'SALDO - ' EXT-SALDO(IDX)
            MOVE ' saldo-negativo' TO WS-CLASS-SALDO
            DISPLAY 'CLASS SALDO - ' WS-CLASS-SALDO
           ELSE
            MOVE SPACES TO WS-CLASS-SALDO
           END-IF.

           MOVE SPACES    TO WS-LINHA-TMP.
           MOVE SPACES    TO WS-LINHA-DETALHE.

           STRING '<div class="linha-extrato">'
             '<div class="coluna">' EXT-DATA(IDX) '</div>'
             '<div class="coluna">' EXT-HIST(IDX) '</div>'
             '<div class="coluna">' EXT-DOC(IDX) '</div>'
             '<div class="coluna text-end">'
             WS-CREDITO-TXT '</div>'
             '<div class="coluna text-end'
             WS-CLASS-DEBITO '">'
                    WS-DEBITO-TODO '</div>'
             '<div class="coluna text-end'
             WS-CLASS-SALDO '">'
             WS-SALDO-TODO '</div>'
             '</div>' DELIMITED BY SIZE
           INTO WS-LINHA-TMP
           END-STRING.
           DISPLAY 'LINHA TMP - ' WS-LINHA-TMP

********   IF EXT-DETALHE(IDX) NOT = SPACES
********    STRING '<div class="linha-extrato">'
********            '<div class="coluna"></div>'
********            '<div class="coluna">'
********            EXT-DETALHE(IDX) '</div>'
********            '<div class="coluna"></div>'
********            '<div class="coluna text-end"></div>'
********            '<div class="coluna text-end"></div>'
********            '<div class="coluna text-end"></div>'
********            '</div>' DELIMITED BY SIZE
********    INTO WS-LINHA-DETALHE
********    END-STRING
********   END-IF.

           STRING WS-LINHA-TMP DELIMITED BY SIZE
             WS-LINHA-DETALHE DELIMITED BY SIZE
             INTO WS-LINHAS-ACUM WITH POINTER WS-PTR
           END-STRING.

           ADD EXT-CREDITO(IDX) TO WS-TOTAL-CREDITO.
           ADD EXT-DEBITO(IDX) TO WS-TOTAL-DEBITO.
           MOVE EXT-SALDO(IDX) TO WS-SALDO-TOTAL.

       210-PROCESSAR-LINHAS-EXIT. EXIT.
       220-CONVERTE-TOTAIS.
           MOVE WS-TOTAL-CREDITO TO WS-NUM7.
           MOVE WS-NUM7   TO WS-TOTAL-CREDITO-TXT.
           IF WS-TOTAL-CREDITO = 0
            MOVE SPACES TO WS-TOTAL-CREDITO-TXT
           END-IF.

           MOVE WS-TOTAL-DEBITO TO WS-NUM7.
           MOVE WS-NUM7   TO WS-TOTAL-DEBITO-TXT.
           IF WS-TOTAL-DEBITO = 0
            MOVE SPACES TO WS-TOTAL-DEBITO-TXT
           ELSE
            IF WS-TOTAL-DEBITO < 0
               MOVE '-' TO WS-SINAL-DEBITO-TXT
            END-IF
           END-IF.

           MOVE WS-SALDO-TOTAL TO WS-NUM7.
           MOVE WS-NUM7   TO WS-SALDO-TXT.
           IF WS-SALDO-TOTAL < 0
            MOVE 'saldo-negativo' TO WS-SALDO-CLASS
           ELSE
            MOVE SPACES TO WS-SALDO-CLASS
           END-IF.

       300-CONVERTE-VALORES.
           MOVE SPACES TO WS-TOTAL-DEBITO-TODO.
           MOVE SPACES TO WS-DEBITO-TODO.
           MOVE SPACES TO WS-SALDO-TODO.
           MOVE EXT-CREDITO(IDX) TO WS-NUM.
           MOVE WS-NUM    TO WS-CREDITO-TXT.
           IF EXT-CREDITO(IDX) = 0
            MOVE SPACES TO WS-CREDITO-TXT
           END-IF.

           MOVE EXT-DEBITO(IDX) TO WS-NUM.
           MOVE WS-NUM    TO WS-DEBITO-TXT.
           IF EXT-DEBITO(IDX) = 0
            MOVE SPACES TO WS-DEBITO-TXT
           ELSE
            IF EXT-DEBITO(IDX) < 0
                   MOVE '-' TO WS-DEBITO-SINAL-TXT
            END-IF
           END-IF.

           MOVE EXT-SALDO(IDX) TO WS-NUM.
           MOVE WS-NUM    TO WS-SALDO-TXT.
           IF EXT-SALDO(IDX) = 0
            MOVE SPACES TO WS-SALDO-TXT
           ELSE
            IF EXT-SALDO(IDX) < 0
                   MOVE '-' TO WS-SALDO-SINAL-TXT
            END-IF
           END-IF.

        GET-DATE.
           EXEC CICS ASKTIME ABSTIME(WS-ABSTIME)
           END-EXEC.

           DISPLAY 'WS-ABSTIME: ' WS-ABSTIME.
           EXEC CICS FORMATTIME
                     ABSTIME(WS-ABSTIME)
                     YYYYMMDD(WS-FORMATTED-DATE)
           END-EXEC.

           MOVE WS-FORMATTED-DATE(7:2) TO WS-YEAR.
           MOVE WS-FORMATTED-DATE(5:2) TO WS-MONTH.
           MOVE WS-FORMATTED-DATE(3:2) TO WS-DAY.

           MOVE WS-DAY    TO WS-FORMATTED-OUT(7:2).
           MOVE '/'       TO WS-FORMATTED-OUT(3:1).
           MOVE WS-MONTH  TO WS-FORMATTED-OUT(4:2).
           MOVE '/'       TO WS-FORMATTED-OUT(6:1).
           MOVE WS-YEAR   TO WS-FORMATTED-OUT(1:2).

GAMBI      MOVE WS-FORMATTED-OUT TO        WS-DATA.
        EXTRACT-NAME.
            MOVE 0 TO WS-OFFSET.
            SET NAME-NOT-FOUND TO TRUE.
            PERFORM VARYING WS-OFFSET FROM 0 BY 1
                    UNTIL WS-OFFSET > LENGTH OF WS-RECEIVED-DATA
                       OR NAME-FOUND
                IF WS-RECEIVED-DATA(WS-OFFSET:5) = 'name=' THEN
                    ADD 4 TO WS-OFFSET
                    SET NAME-FOUND TO TRUE
                    DISPLAY 'EH NAME'
                END-IF
            END-PERFORM.
            IF NAME-FOUND THEN
                DISPLAY 'FOUND IT'
                MOVE 0 TO WS-NAME-LENGTH
                INSPECT WS-RECEIVED-DATA(WS-OFFSET:256 - WS-OFFSET + 1)
                    TALLYING WS-NAME-LENGTH FOR CHARACTERS
                    BEFORE INITIAL ' '
                    DISPLAY 'WS-NAME-LENGTH ' WS-NAME-LENGTH
                    DISPLAY 'O QUE VEIO'
*************       INSPECT WS-RECEIVED-DATA(WS-OFFSET:256)
*************               REPLACING ALL '+' BY ' '
                DISPLAY WS-RECEIVED-DATA(WS-OFFSET:256)
                DISPLAY 'WS-OFFSET - ' WS-OFFSET
*************   MOVE 40 TO WS-NAME-LENGTH
                MOVE  WS-RECEIVED-DATA(WS-OFFSET:40)
                 TO WS-NAME
            END-IF.
