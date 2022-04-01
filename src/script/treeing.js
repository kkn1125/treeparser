(function () {
    function Controller() {
        let model;
        let ta = document.querySelector('textarea.auto-input');

        this.init = function (models) {
            model = models;
            model.autoInput(ta.value);
            window.addEventListener('input', this.autoInput);
            window.addEventListener('input', this.changeIndent);
        }

        this.changeIndent = function (e) {
            const target = e.target;

            if(target.id != 'indent') return;

            model.changeIndent(target.value);
        }

        this.autoInput = function (e) {
            const target = e.target;

            if(!target.classList.contains('auto-input')) return;

            model.autoInput(target.value);
        }
    }

    function Model() {
        let view;

        this.init = function (views) {
            view = views;

            this.renderView();
        }

        this.changeIndent = function (value) {
            let tmp;
            let ta = document.querySelector('textarea.auto-input');
            if(value.match(/\d+/g)) tmp = parseInt(value);
            else tmp = 4;
            view.changeIndent(tmp);
            this.autoInput(ta.value);
        }

        this.autoInput = function (data) {
            let directory = {};
            let before = -1;
            let location = [];

            data.split('\n').forEach((d,i)=>{
                if(!directory[i]) directory[i] = {};
                let current = d.match(/\s/g)?.length||0;
                directory[i]['name'] = d.trim();

                if(current>before) {
                    location.push(current);
                    if(directory[i-1]) directory[i-1]['child'] = true;
                } else if(current<before) {
                    location.pop();
                } else {
                    directory[i-1]['branch'] = true;
                }

                directory[i]['group'] = location.slice(0);
                before = current;
            });
            this.renderView(directory);
        }

        this.renderView = function (directory){
            view.renderView(directory);
        }
    }

    function View() {
        let app;
        let ta = document.querySelector('textarea.auto-input');
        let initial, indent;

        this.init = function (initials) {
            initial = initials;
            indent = initial.indent||2;
            ta.value = initial.string;
            app = document.querySelector('#app');
        }

        this.isEmpty = function (data) {
            return Object.keys(data).length==0
        }

        this.changeIndent = function (indentval) {
            indent = indentval;
        }

        this.renderView = function (directory={}){
            console.log(directory)
            app.innerHTML = '';
            let contiguous = `┬`;
            let space = `　`;
            Object.values(directory).forEach((v, i, o)=>{
                let branch = `└`;
                let spacing = space.repeat(v.group[v.group.length-1]);
                
                // if(o[i+1] && o[i+1].group < v.group) {
                //     spacing = spacing.split('').map((a,i)=>v.group-i<=spacing.length-1?'│':a).join('');
                // }

                // if(o[i+1] && o[i+1].group >= v.group && v.branch) {
                //     branch = `├`;
                // }

                let link = v.group?branch+(v.child?contiguous:'─'):'';
                app.insertAdjacentHTML('beforeend', `${spacing}${link}${v.name}`);
                app.insertAdjacentHTML('beforeend', `<br>`);
            });
        }

        this.branchType = function (idx, max) {
            switch(idx) {
                case 0: return '';
                case max: return '└';
                default: return '├';
            }
        }
    }

    return {
        init(initial) {
            const view = new View();
            const model = new Model();
            const controller = new Controller();

            view.init(initial);
            model.init(view);
            controller.init(model);
        }
    }
})().init({string: 
`eqwe
 asd
  wow
 hm
 end
  test
   kimson`});