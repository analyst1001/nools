"use strict";
var declare = require("declare.js");


var id = 0;

declare({

    instance: {
        constructor: function (obj) {
            this.object = obj;
            this.recency = 0;
            this.id = id++;
        },

        equals: function (fact) {
            if (fact instanceof this._static) {
                return fact !== null && fact.object === this.object;
            } else {
                return fact !== null && fact === this.object;
            }
        }
    }

}).as(exports, "Fact");

declare({

    instance: {

        constructor: function () {
            this.recency = 0;
            this.facts = [];
        },

        dispose: function () {
            this.facts.length = 0;
        },

        assertFact: function (fact) {
            if (fact.object === null) {
                throw new Error('The fact asserted cannot be null!');
            }
            fact.recency = this.recency++;
            this.facts.push(fact);
            return fact;
        },

        retractFact: function (fact) {
            var facts = this.facts, l = facts.length;
            for (var i = 0; i < l; i++) {
                var existingFact = facts[i];
                if (existingFact.equals(fact)) {
                    this.facts.splice(i, 1);
                    return existingFact;
                }
            }
            //if we made it here we did not find the fact
            throw new Error("the fact to remove does not exist");


        }
    }

}).as(exports, "WorkingMemory");

