// ALUNO: Pedro Henrique Alemida Guimarães

// ============================================================
// S2_library-bad.js — Mãos à Obra da Semana 2 (Parte A)
// Este código FUNCIONA (rode: node S2_library-bad.js). E é ruim de propósito.
// Sua tarefa, em dupla: NÃO refatore. Apenas leia e marque os cheiros.
//   Use // SMELL: <nome>        para cada code smell (nomes do slide 16)
//   Use // VIOLA: <S|O|L|I|D>   para cada princípio SOLID violado (slide 4)
// ============================================================

// VIOLA: S (a classe cuida de livros, usuários, empréstimos, e-mail e relatórios)
class Library {
  constructor() {
    this.bks = []; // SMELL: nome obscuro
    this.us = []; // SMELL: nome obscuro
    this.lns = []; // SMELL: nome obscuro
  }

  // VIOLA: S (adiciona livro, empresta, devolve, cobra atraso e envia e-mail)
  // VIOLA: O (para criar "renovar empréstimo" é preciso abrir e editar este método)
  doStuff(book, userId, action) {
    // SMELL: nome obscuro
    if (action === "add") {
      this.bks.push(book);
      console.log("Added: " + book.t); // SMELL: nome obscuro
    } else if (action === "lend") {
      var u = null; // SMELL: nome obscuro
      for (var i = 0; i < this.us.length; i++) {
        // SMELL: Duplicate Code
        if (this.us[i].id === userId) {
          u = this.us[i];
        }
      }
      var b = null; // SMELL: nome obscuro
      for (var j = 0; j < this.bks.length; j++) {
        // SMELL: Duplicate Code (busca de livro repete abaixo)
        if (this.bks[j].t === book.t) {
          b = this.bks[j];
        }
      }
      if (u != null && b != null && b.cp > 0) {
        // SMELL: nome obscuro
        b.cp = b.cp - 1;
        this.lns.push({ uid: userId, bt: book.t, d: new Date(), st: 1 });
        // 1 = active, 2 = returned, 3 = overdue
        // VIOLA: D
        fetch("http://email.api/send", {
          method: "POST",
          body: JSON.stringify({ to: u.em, msg: "Você pegou " + book.t }),
        })
          .then((r) => {
            /* nada */
          })
          .catch((e) => {}); // SMELL: Erro engolido
      }
    } else if (action === "return") {
      for (var k = 0; k < this.lns.length; k++) {
        if (
          this.lns[k].uid === userId &&
          this.lns[k].bt === book.t &&
          this.lns[k].st === 1
        ) {
          // SMELL: Magic Number
          this.lns[k].st = 2; // SMELL: Magic Number
          for (var m = 0; m < this.bks.length; m++) {
            // SMELL: Duplicate Code
            if (this.bks[m].t === book.t) {
              this.bks[m].cp = this.bks[m].cp + 1;
            }
          }
        }
      }
    } else if (action === "overdue") {
      for (var n = 0; n < this.lns.length; n++) {
        var diff = (new Date() - this.lns[n].d) / (1000 * 60 * 60 * 24);
        if (this.lns[n].st === 1 && diff > 7) {
          // SMELL: Magic Number
          this.lns[n].st = 3; // SMELL: Magic Number
          var usr = null;
          for (var p = 0; p < this.us.length; p++) {
            // SMELL: Duplicate Code
            if (this.us[p].id === this.lns[n].uid) {
              usr = this.us[p];
            }
          }
          if (usr) {
            // VIOLA: D (e-mail concreto de novo, sem abstração)
            fetch("http://email.api/send", {
              // SMELL: Erro engolido (fetch sem tratamento de erro)
              method: "POST",
              body: JSON.stringify({
                to: usr.em,
                msg: "Atrasado: " + this.lns[n].bt,
              }),
            });
          }
        }
      }
    }
  }

  registerUser(n, e, ph, addr, cty, st, zp, isAdm) {
    // SMELL: Long Parameter List (8 parâmetros)
    // SMELL: Primitive Obsession (e-mail e telefone como texto solto)
    this.us.push({
      id: this.us.length + 1,
      n: n,
      em: e,
      ph: ph,
      addr: addr,
      cty: cty,
      st: st,
      zp: zp,
      isAdm: isAdm,
    });
  }

  report(type) {
    if (type === 1) {
      // SMELL: Switch sobre tipo
      console.log("Total de livros: " + this.bks.length);
    } else if (type === 2) {
      console.log("Total de usuários: " + this.us.length);
    } else if (type === 3) {
      console.log("Total de empréstimos: " + this.lns.length);
    }
  }
}

// Uso:
const lib = new Library();
lib.registerUser(
  "Ana",
  "ana@uepb.edu.br",
  "83999990000",
  "Rua X, 10",
  "Patos",
  "PB",
  "58700-000",
  false,
);
lib.doStuff({ t: "Clean Code", cp: 3 }, null, "add");
lib.doStuff({ t: "Clean Code" }, 1, "lend");
lib.report(1);
