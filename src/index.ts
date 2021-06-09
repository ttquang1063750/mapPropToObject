import './styles.scss';
import {Utils} from './utils';

const myData = {};

export function example(prop: string, value: any) {
    const div = document.createElement('DIV');
    div.innerHTML = `
         {<br>
        &nbsp;&nbsp;&nbsp;prop: <strong>${prop}</strong> <br>
        &nbsp;&nbsp;&nbsp;value: <strong>${value}</strong>
        <br>}
        `;

    div.title = 'click to add';
    div.classList.add('block');
    div.addEventListener('click', () => {
        setData(prop, value);
    });

    document.getElementById('example').append(div);
}

export function addNewProp() {
    const prop = (document.getElementById('prop') as HTMLInputElement).value;
    const value = (document.getElementById('value') as HTMLInputElement).value;
    setData(prop, value);
}

export function setData(prop: string, value: string) {
    if (prop && value) {
        Utils.createObjectByProp(myData, String(prop).trim().split('.').map(key => Utils.toKey(key)), value);
        document.getElementById('json').textContent = JSON.stringify(myData, undefined, 2);
        console.log(myData);
    }
}

window.onload = () => {
    document.getElementById('my-form').addEventListener('submit', (event) => {
        event.preventDefault();
        addNewProp();
    });

    document.getElementById('upload').addEventListener('change', (event) => {
        const reader = new FileReader();
        reader.onload = event => {
            const results: Record<string, any> = [];
            const rows = (event.target.result as string).split(/\r\n|\n/).filter(s => s.trim().length  > 0);
            const header = rows.shift().split(';');
            rows.forEach(row => {
                const cols = row.split(';');
                const data = {};
                header.forEach((h, i) => {
                    Utils.createObjectByProp(data, h.split('.').map(key => Utils.toKey(key)), cols[i] ? cols[i] === 'null' ? null : cols[i] : null)
                });
                results.push(data);
            });
            document.getElementById('json').textContent = JSON.stringify(results, undefined, 2);
        };
        reader.readAsText((event.target as HTMLInputElement).files[0]);
    });

    // Fake data
    example('contacts.groups.0.id', 1);
    example('contacts.groups.0.name', 'group 1');
    example('contacts.groups.0.age', 70);
    example('contacts.groups.1.id', 2);
    example('contacts.groups.1.name', 'group 1');
    example('contacts.groups.1.age', 90);
    example('users.0', 'abc');
    example('users.1', 'xyz');
    example('view.0.0.id', 12);
    example('view.0.1.id', 32);
    example('lazy.0.0.0.id', 34);
    example('dolor.0.0.0.yoyo.0.id', 12);
    example('dolor.0.0.0.yoyo.0.name', 'yoyo 1');
    example('dolor.0.0.0.yoyo.1.id', 23);
    example('dolor.0.0.0.yoyo.1.name', 'yoyo 2');
    example('dolor.0.0.1.yoyo.0.id', 54);
    example('dolor.0.0.1.yoyo.0.name', 'yoyo 21');
};
