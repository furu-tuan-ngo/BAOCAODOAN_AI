class Law {
    constructor(hypothesis, conclude, operator, DV, sentence) {
        this.hypothesis = hypothesis;
        this.conclude = conclude;
        this.operator = operator;
        this.DV = DV;
        this.sentence = sentence;
    }
    get result() {
        return this.getResult();
    }
    getResult = () => {
        for (const hypo of this.hypothesis) {
            if (hypo.value == null) return false;
        }
        switch (this.operator) {
            case '+':
                return this.hypothesis[0].value + this.hypothesis[1].value;
            case '-':
                return this.hypothesis[0].value - this.hypothesis[1].value;
            case 'X':
                return this.hypothesis[0].value * this.hypothesis[1].value;
            case '/':
                return this.hypothesis[0].value / this.hypothesis[1].value;
            default:
                return false;
        }
    }
    get hypothesisNames() {
        return this.hypothesis.map(hypo => hypo.name);
    }
    get leadSentences() {
        var op = (this.operator === '/') ? '&divide;' : this.operator;
        return this.sentence + '</br>' + this.hypothesis[0].value + ' ' + op + ' '
            + this.hypothesis[1].value + ' = ' + this.result + ' (' + this.DV + ') </br>';
    }
}
// BUILD LAW COLLECTION
const LawCollection = [
    {
        id: 1,
        hypothesis: [
            { name: 'SOHANG1', value: null },
            { name: 'SOHANG2', value: null }
        ],
        conclude: 'TONG',
        operator: '+'
    },
    {
        id: 2,
        hypothesis: [
            { name: 'SOBITRU', value: null },
            { name: 'SOTRU', value: null }
        ],
        conclude: 'HIEU',
        operator: '-'
    },
    {
        id: 3,
        hypothesis: [
            { name: 'SOBICHIA', value: null },
            { name: 'SOCHIA', value: null }
        ],
        conclude: 'THUONG',
        operator: '/'
    },
    {
        id: 4,
        hypothesis: [
            { name: 'THUASO1', value: null },
            { name: 'THUASO2', value: null }
        ],
        conclude: 'TICH',
        operator: 'X'
    },
    {
        id: 5,
        hypothesis: [
            { name: 'SOHANG1', value: null },
            { name: 'SUMVAL', value: null }
        ],
        conclude: 'SOHANG2',
        operator: '+'
    },
    {
        id: 6,
        hypothesis: [
            { name: 'SOHANG1', value: null },
            { name: 'SUBTRACTVAL', value: null }
        ],
        conclude: 'SOHANG2',
        operator: '-'
    },
    {
        id: 7,
        hypothesis: [
            { name: 'SOHANG1', value: null },
            { name: 'PRODUCTVAL_SUM', value: null }
        ],
        conclude: 'SOHANG2',
        operator: 'X'
    },
    {
        id: 8,
        hypothesis: [
            { name: 'SOHANG1', value: null },
            { name: 'DEVICEVAL', value: null }
        ],
        conclude: 'SOHANG2',
        operator: '/'
    },
    {
        id: 9,
        hypothesis: [
            { name: 'SOBITRU', value: null },
            { name: 'DEVICE_SUB', value: null }
        ],
        conclude: 'SOTRU',
        operator: '/'
    },
    {
        id: 9,
        hypothesis: [
            { name: 'THUASO3', value: null },
            { name: 'PRODUCTVAL_PRO', value: null }
        ],
        conclude: 'THUASO2',
        operator: 'X'
    },
    {
        id: 10,
        hypothesis: [
            { name: 'SOBICHIA_SUB', value: null },
            { name: 'SOCHIA_SUB', value: null }
        ],
        conclude: 'THUASO2',
        operator: '/'
    },
    {
        id: 11,
        hypothesis: [
            { name: 'THUASO1_SUB', value: null },
            { name: 'THUASO2_SUB', value: null }
        ],
        conclude: 'THUASO2',
        operator: 'X'
    },
    {
        id: 12,
        hypothesis: [
            { name: 'SBC_SUB1_F', value: null },
            { name: 'SBC_SUB2_F', value: null }
        ],
        conclude: 'SOBITRU',
        operator: 'X'
    },
    {
        id: 13,
        hypothesis: [
            { name: 'SOBITRU_SUB', value: null },
            { name: 'SOTRU_SUB', value: null }
        ],
        conclude: 'SOBITRU',
        operator: '-'
    },
    {
        id: 14,
        hypothesis: [
            { name: 'SOBITRU', value: null },
            { name: 'DIV_SUB', value: null }
        ],
        conclude: 'SOTRU',
        operator: '/'
    },
];

let ListLaw = [];

LawCollection.forEach(lawItem => {
    ListLaw.push(new Law(lawItem.hypothesis, lawItem.conclude, lawItem.operator, '', ''));
});

let getKeys = (listObj) => {
    return listObj.map(obj => obj.name);
}

//handle
let handle = (hypothesis, goal, DV, listSentences) => new Promise((resolve) => {
    let Ansewers = [];
    let CloseAppears = [];
    hypothesis.forEach(hypo => {
        CloseAppears.push(hypo);
    });
    let flag = true;
    var indexSentence = 0;
    while (flag == true) {
        flag = false;
        for (const law of ListLaw) {
            const Keys = getKeys(law.hypothesis);
            const Closes = getKeys(CloseAppears);
            let flagHypo = true;
            const validHypo = Keys.reduce((acc, cur) => {
                const close = CloseAppears.filter(c => c.name == cur);
                if (!close[0]) flagHypo = false;
                return [...acc, close[0]];
            }, []);
            if (law.hypothesis.length === validHypo.length && flagHypo) {
                if (!Closes.includes(law.conclude)) {
                    law.hypothesis = validHypo;
                    CloseAppears.push({ name: law.conclude, value: law.result });
                    law.DV = DV;
                    law.sentence = listSentences[indexSentence];
                    indexSentence++;
                    Ansewers.push(law);
                    if (law.conclude !== goal) flag = true;
                    break;
                }
            }
        }
    }
    resolve(Ansewers);
})
let getVerbTONG = () => {
    return [
        'đựng', 'có', 'trồng được', 'trồng', 'dài', 'chứa', 'sửa được', ' ăn ', 'dệt được', 'bán được', 'hái được',
        'gấp được', 'chở được'
    ]
}
listCharacterSpec = {
    sum: ['nhiều hơn', 'hơn', 'thêm'],
    sub: ['ít hơn', 'kém hơn', 'bớt'],
    pro: ['gấp đôi', 'gấp ba', 'gấp hai', 'gấp bốn', 'gấp năm', 'gấp sáu', 'gấp bảy', 'gấp tám', 'gấp chín', 'gấp'],
    div: ['bằng một phần', 'một phần']
};
let invert = (operator) => {
    if (operator == '+') return '-';
    if (operator == '-') return '+';
    if (operator == 'X') return '/';
    if (operator == '/') return 'X';
    return '';
}
let Frame1 = (inputString) => new Promise((resolve, reject) => {
    const result = {};
    var characterDT = '';
    while (inputString.includes(',')) {
        inputString = inputString.replace(',', '.');
    }
    var specialName = '';
    let lines = inputString.split('.').filter(item => item !== '').map(item => item.trim());
    if (lines.length > 3) {
        specialName = lines[0].replace('Một', '').replace('một', '').trim() + ' đó ';
        lines.splice(0, 1);
    }
    var flagOperator;
    for (const characters in listCharacterSpec) {
        for (const charact of listCharacterSpec[characters]) {
            if (inputString.includes(charact)) {
                flagOperator = characters;
                characterDT = charact;
                if (characters === 'pro' || characters === 'div') {
                    lines[1] = (convertChar(lines[1]));
                }
                break;
            }
        }
    }
    var operatorFirst = '';
    switch (flagOperator) {
        case 'sum':
            operatorFirst = '+';
            break;
        case 'sub':
            operatorFirst = '-';
            break;
        case 'pro':
            operatorFirst = 'X';
            break;
        case 'div':
            operatorFirst = '/';
            break;
    }
    const verbs = getVerbTONG();
    for (const v of verbs) {
        if (lines[0].includes(v)) {
            const L0 = lines[0].split(v);
            result['CN1'] = L0[0].trim();
            result['DT'] = v;
            demo = L0[1].split(' ').filter(item => item !== '').map(item => item.trim());
            result['SL1'] = Number.parseInt(demo[0]);
            break;
        }
    }
    result['DV'] = inputString.replace('bao nhiêu', 'mấy').split('mấy')[1].replace('?', '').trim();
    strSplit1 = (lines[1].includes(result.DT)) ? result.DT + ' ' : '';
    let strSplit2 = strSplit1;
    if (lines[1].includes(strSplit1 + removeNumberString(characterDT))) {
        strSplit2 = strSplit1 + removeNumberString(characterDT);
    } else if (lines[1].includes(strSplit1 + 'số ' + result.DV + ' ' + removeNumberString(characterDT))) {
        strSplit2 = strSplit1 + 'số ' + result.DV + ' ' + removeNumberString(characterDT);
    } else if (lines[1].includes(removeNumberString(characterDT))) {
        strSplit2 = removeNumberString(characterDT);
    }
    let demo1 = lines[1].split(strSplit2).filter(item => item !== '').map(item => item.trim());
    if (!demo1[0].includes(result['CN1'])) {
        result['CN2_bef'] = demo1[0];
    } else {
        result['CN2_aft'] = '';
    }
    let demo2 = demo1[1].split(' ').filter(item => item !== '').map(item => item.trim());

    demo2.forEach(item => {
        console.log(item);
        if (!result.CN2_bef) {
            if (!result.DV.includes(item) && isNaN(Number.parseInt(item)))
                result['CN2_aft'] = result.CN2_aft + ' ' + item;
        }
        if (!isNaN(Number.parseInt(item))) result['SL2'] = Number.parseInt(item);
    });
    if (result.CN2_aft) {
        result.CN2_aft = result.CN2_aft.trim();
    }
    let hypothesis = [];
    let CNSt = result.CN2_bef;
    if (result.CN2_aft) {
        operatorFirst = invert(operatorFirst);
        CNSt = result.CN2_aft;
    }
    var flagSentences = 2;
    switch (operatorFirst) {
        case '+':
            hypothesis = [
                { name: 'SOHANG1', value: result.SL1 },
                { name: 'SUMVAL', value: result.SL2 }
            ];
            break;
        case '-':
            hypothesis = [
                { name: 'SOHANG1', value: result.SL1 },
                { name: 'SUBTRACTVAL', value: result.SL2 }
            ];
            break;
        case 'X':
            hypothesis = [
                { name: 'SOHANG1', value: result.SL1 },
                { name: 'PRODUCTVAL_SUM', value: result.SL2 }
            ];
            break;
        case '/':
            hypothesis = [
                { name: 'SOHANG1', value: result.SL1 },
                { name: 'DEVICEVAL', value: result.SL2 }
            ];
            break;
        default:
            hypothesis = [
                { name: 'SOHANG1', value: result.SL1 },
                { name: 'SOHANG2', value: result.SL2 }
            ];
            flagSentences = 1;
            break;
    }
    var subSentence = (CNSt.includes('Số') || CNSt.includes('số')) ?
        CNSt + ' ' + specialName + ' ' + result.DT + ' là:' :
        'Số ' + result.DV + ' ' + CNSt + ' ' + specialName + ' ' + result.DT + ' là:'
    var listSentences = (flagSentences == 2) ? [subSentence] : [];
    let goal = 'SOHANG2';
    const listCharOfQuestion = {
        TONG: ['tổng cộng', 'tất cả', 'cả']
    };
    for (const listCharName in listCharOfQuestion) {
        for (const item of listCharOfQuestion[listCharName]) {
            let flag = true;
            if (lines[2].includes(item) || lines[2].includes(result.CN1)) {
                goal = listCharName;
                flag = false;
                listSentences.push(handleQuestionSentences(lines[2]));
                break;
            }
            if (flag == false) {
                break;
            }
        }
    }
    console.log(result);
    const data = {
        goal: goal,
        DV: result.DV,
        hypothesis: hypothesis,
        listSentences: listSentences
    }
    resolve(data);
});
let handleQuestionSentences = (line) => {
    line = line.replace('bao nhiêu', 'mấy').replace('?', '');
    line = line.trim();
    const l = line.split('hỏi')[1].trim().split('mấy');
    let text = 'Số ' + l[1].trim() + ' ' + l[0].trim() + ' là : ';
    return text;
}
let checkContainNumber = (line) => {
    var flag = false;
    const l = line.split(' ');
    for (const item of l) {
        if (!isNaN(Number.parseInt(item))) {
            flag = true;
            break;
        }
    }
    return flag;
}
let convertChar = (line) => {
    let listChar = [
        { string: 'hai', number: '2' },
        { string: 'đôi', number: '2' },
        { string: 'ba', number: '3' },
        { string: 'bốn', number: '4' },
        { string: 'năm', number: '5' },
        { string: 'sáu', number: '6' },
        { string: 'bảy', number: '7' },
        { string: 'tám', number: '8' },
        { string: 'chín', number: '9' },
    ]
    for (const char of listChar) {
        if (line.includes('gấp ' + char.string))
            line = line.replace('gấp ' + char.string, 'gấp ' + char.number);
        if (line.includes('một phần ' + char.string))
            line = line.replace('một phần ' + char.string, 'một phần ' + char.number);
    }
    return line;
}
let removeNumberString = (line) => {
    let listNumber = 'đôi hai ba bốn năm sáu bảy tám chín';
    let f = '';
    let flag = line.trim().split(' ').filter(item => item !== '');
    flag.forEach(item => {
        if (listNumber.includes(item)) {
            f = item;
        }
    });
    return line.replace(f, '').trim();
}

let Frame2 = (inputString) => new Promise((resolve, reject) => {
    let stringSub = inputString.replace(',', 'FLAGREMOVE').split('FLAGREMOVE').filter(item => item != '');
    if (stringSub[1]) {
        inputString = stringSub[1].trim();
    } else {
        inputString = stringSub[0].trim();
    }
    let listDT = getVerbTONG();
    var lines = inputString.split('hỏi').filter(item => item !== '');
    var line1 = lines[0].trim().split('đều');
    var result = {};
    for (const l of line1) {
        const x = l.trim().split(' ');
        for (const y of x) {
            if (!isNaN(Number.parseInt(y))) {
                if (!result.SL1) {
                    result.SL1 = Number.parseInt(y);
                } else {
                    result.SL2 = Number.parseInt(y);
                }
            }
        }
    }
    let a = lines[0].trim().split('' + result.SL1);
    result['DV'] = inputString.replace('bao nhiêu', 'mấy').split('mấy').filter(item => item != '')[1].replace('?', '').trim();
    var sentences1 = '';
    if (!isNaN(Number.parseInt(lines[1].trim().split(' ').filter(item => item != '')[0]))) {
        sentences1 = handleQuestionSentences('hỏi ' + replaceCharMoi(lines[1]));
    } else {
        sentences1 = handleQuestionSentences('hỏi ' + (lines[1]));
    }
    var hypothesis = [
        { name: 'SOBICHIA_SUB', value: result.SL1 },
        { name: 'SOCHIA_SUB', value: result.SL2 }
    ];
    var goal = 'THUASO2';
    var listSentences = [sentences1];
    var checker = true;
    lines[1].split(' ').forEach(item => {
        if (!isNaN(Number.parseInt(item))) checker = false;
    });
    if (!checker) {
        var ratio = lines[1].trim().split(' ')[0].trim();
        ratio = Number.parseInt(ratio);
        hypothesis.push({
            name: 'THUASO1', value: ratio
        });
        goal = 'TICH';
        listSentences.push(handleQuestionSentences('hỏi ' + lines[1]));
    }
    console.log(result);
    resolve({
        goal: goal,
        hypothesis: hypothesis,
        listSentences: listSentences,
        DV: result.DV
    })
});
let Frame3 = (inputString) => new Promise((resolve, reject) => {
    const result = {};
    const lineSet = inputString.split('hỏi');
    let lines = lineSet[0].split('mỗi');
    const listLines1 = lines[0].trim().split(' ').filter(item => item !== '');
    let i = listLines1.length;
    result['DV1'] = '';
    listLines1.forEach((item, index) => {
        if (!isNaN(Number.parseInt(item))) {
            result['SL1'] = Number.parseInt(item);
            i = index;
        }
        if (index > i) result['DV1'] = result.DV1 + ' ' + item;
    });
    result.DV1 = result.DV1.trim();
    let listLines2 = lines[1].trim().replace('.', '').split(' ').filter(item => item !== '');
    let i2 = listLines2.length;
    result['DV2'] = '';
    listLines2.forEach((item, index) => {
        if (!isNaN(Number.parseInt(item))) {
            result['SL2'] = Number.parseInt(item);
            i2 = index;
        }
        if (index > i2) result['DV2'] = result.DV2 + ' ' + item;
    });
    result.DV2 = result.DV2.trim();
    let hypothesis = [
        { name: 'THUASO1_SUB', value: result.SL1 },
        { name: 'THUASO2_SUB', value: result.SL2 }
    ];
    let goal = 'THUASO2';
    var sentences1 = '';
    if (!isNaN(Number.parseInt(lineSet[1].trim().split(' ').filter(item => item != '')[0]))) {
        sentences1 = handleQuestionSentences('hỏi ' + replaceCharMoi(lineSet[1]));
    } else {
        sentences1 = handleQuestionSentences('hỏi ' + (lineSet[1]));
    }
    var listSentences = [sentences1];
    if (!isNaN(Number.parseInt(lineSet[1].trim().split(' ')[0]))) {
        hypothesis.push({
            name: 'THUASO1', value: Number.parseInt(lineSet[1].trim().split(' ')[0])
        });
        goal = 'TICH';
        listSentences.push(handleQuestionSentences('hỏi ' + lineSet[1]));
    }
    resolve({
        hypothesis: hypothesis,
        DV: result.DV2,
        listSentences: listSentences,
        goal: goal
    })
});

let Frame4 = (inputString) => new Promise((resolve, reject) => {
    let listDT = getVerbTONG();
    var DT = '';
    for (const item of listDT) {
        if (inputString.includes(item)) {
            DT = item;
        }
    }
    var result = {};
    var lineSet = inputString.split('hỏi').filter(item => item != '');
    var line1 = lineSet[0].trim().replace('một', '1').replace(',', '').replace('.', '').split(DT).filter(item => item !== '');
    result['SL1'] = Number.parseInt(line1[0].split(' ')[0]);
    result['CN'] = line1[0].split(result['SL1'])[1].trim();
    result['SL2'] = Number.parseInt(line1[1].trim().split(' ')[0]);
    result['DV'] = line1[1].split(result['SL2'])[1].trim();
    result['TS1'] = Number.parseInt(lineSet[1].trim().split(' ')[0]);
    var listSentences = [];
    var hypothesis = [];
    if (result.SL1 == 1) {
        hypothesis = [
            { name: 'THUASO1_SUB', value: result.SL2 },
            { name: 'THUASO2_SUB', value: result.TS1 }
        ];
        goal = 'THUASO2';
    }
    else {
        hypothesis = [
            { name: 'SOBICHIA_SUB', value: result.SL2 },
            { name: 'SOCHIA_SUB', value: result.SL1 },
            { name: 'THUASO1', value: result.TS1 }
        ];
        goal = 'TICH';
        listSentences.push(handleQuestionSentences('hỏi ' + replaceCharMoi(lineSet[1])));
    }
    listSentences.push(handleQuestionSentences('hỏi ' + lineSet[1]));
    resolve({
        DV: result.DV,
        hypothesis: hypothesis,
        listSentences: listSentences,
        goal: goal
    });
});

let Frame5 = (inputString) => new Promise((resolve, reject) => {
    var listNegDT = ['lấy ra', 'rời bến', 'lấy đi', 'rời', 'đổ', 'đã bán', 'bán','cho'];
    var listPosDT = ['có','chứa được', 'chứa','đựng được', 'đựng',];
    while (inputString.includes(',')) {
        inputString = inputString.replace(',', '.');
    }
    var listSpl = inputString.split('.');
    var result = {};
    result['DV'] = inputString.replace('bao nhiêu', 'mấy').replace('?', '').split('mấy')[1].trim();
    var flagSL = 1;
    var sen2 = '';
    var sen1 = '';
    var listSen = [];
    var flag = true;
    var checker = true;
    var flagSentences = true;
    listSpl.forEach(item => {
        item = item.trim();
        if (item.includes('hỏi')) {
            sen2 = handleQuestionSentences(item);
        }
        for (const i of listNegDT) {
            if (item.includes(i)) {
                if (flag) {
                    let check = true;
                    for (const x of listPosDT) {
                        if (item.includes(x)) {
                            sen1 = 'Số ' + result.DV + ' ' + item.split(x)[0].trim() + ' ' + i + ' là';
                            flag = false;
                            check = false;
                        }
                    }
                    if (check) {
                        sen1 = 'Số ' + result.DV + ' ' + item.split(i)[0].trim() + ' ' + i + ' là';
                        flag = false;
                    }
                }
                if (!item.includes('một phần')) {
                    result['SL' + flagSL] = Number.parseInt(item.split(' ').filter(item => (!isNaN(Number.parseInt(item))))[0]);
                    if (flagSL == 2) {
                        flagSentences = false;
                    }
                    flagSL++;
                    break;
                } else {
                    result['DIV_SUB'] = Number.parseInt(item.split(' ').filter(item => (!isNaN(Number.parseInt(item))))[0]);
                    flagSentences = false;
                }
            }
        }
        for (const i of listPosDT) {
            if (item.includes(i)) {
                var count = 0;
                listNegDT.forEach(z => {
                    if (item.includes(z)) count++;
                });
                if (count == 0) {
                    if (!item.includes('mỗi')) {
                        if (!inputString.includes('mỗi')) {
                            result['SBT'] = Number.parseInt(item.split(' ').filter(item => (!isNaN(Number.parseInt(item))))[0]);
                            break;
                        } else {
                            checker = false;
                            result['PRO_SUB1'] = Number.parseInt(item.split(' ').filter(item => (!isNaN(Number.parseInt(item))))[0]);
                        }
                    } else {
                        flagSentences = false;
                        checker = false;
                        result['PRO_SUB2'] = Number.parseInt(item.split(' ').filter(item => (!isNaN(Number.parseInt(item))))[0]);
                    }
                }
            }
        }
    });
    if (!checker) {
        sen1 = 'Số ' + result.DV + ' ban đầu có tất cả là :';
    }
    var hypothesis = [];
    var goal = '';
    if (result.SBT) {
        if (!result.DIV_SUB) {
            hypothesis = [
                { name: 'SOBITRU_SUB', value: result.SBT },
                { name: 'SOTRU_SUB', value: result.SL1 }
            ];
            goal = 'SOBITRU';
            if (result.SL2) {
                hypothesis.push({
                    name: 'SOTRU', value: result.SL2
                });
                goal = 'HIEU';
            }
        } else {
            hypothesis = [
                { name: 'SOBITRU', value: result.SBT },
                { name: 'DIV_SUB', value: result.DIV_SUB }
            ];
            goal = 'HIEU';
        }
    } else {
        hypothesis = [
            { name: 'SBC_SUB1_F', value: result.PRO_SUB1 },
            { name: 'SBC_SUB2_F', value: result.PRO_SUB2 },
            { name: 'SOTRU', value: result.SL1 }
        ];
        goal = 'HIEU';
    }
    if (!flagSentences) listSen.push(sen1);
    listSen.push(sen2);
    resolve({
        hypothesis: hypothesis,
        DV: result.DV,
        goal: goal,
        listSentences: listSen
    })
})

let Frame6 = (inputString) => new Promise((resolve, reject) => {
    var listDT = ['có', 'chứa được', 'chứa','đựng được','đựng','cho'];
    var listSpl = inputString.replace(',', '.').split('.');
    var result = {};
    var sen1 = '';
    listSpl.forEach(item => {
        if (item.includes('hỏi')) {
            result['TS1'] = Number.parseInt(item.trim().split(' ').filter(i => (!isNaN(Number.parseInt(i))))[0]);
            sen1 = handleQuestionSentences((item));
        } else {
            result['TS2'] = Number.parseInt(item.trim().split(' ').filter(i => (!isNaN(Number.parseInt(i))))[0]);
            result['DV2'] = item.split('' + result.TS2)[1].trim();
        }
    });
    result['DV'] = inputString.replace('bao nhiêu', 'mấy').replace('?', '').split('mấy')[1].trim();

    var hypothesis = [];
    var goal = '';
    if (result.DV === result.DV2) {
        hypothesis = [
            { name: 'THUASO1', value: result.TS1 },
            { name: 'THUASO2', value: result.TS2 }
        ];
        var goal = 'TICH';
    } else {
        hypothesis = [
            { name: 'SOBICHIA', value: result.TS1 },
            { name: 'SOCHIA', value: result.TS2 }
        ];
        goal = 'THUONG';
    }
    console.log(result);
    listSentences = [sen1];
    resolve({
        hypothesis: hypothesis,
        DV: result.DV,
        listSentences: listSentences,
        goal: goal
    })
});

let replaceCharMoi = (line) => {
    let x = line.trim().split(' ');
    return line.replace(x[0], 'mỗi');
}
let sentToServer = (result) => {
    handle(result.hypothesis, result.goal, result.DV, result.listSentences).then(finalRes => {
        let text = '';
        finalRes.forEach(item => {
            text += item.leadSentences;
        });
        text += 'Đáp số : ' + finalRes[finalRes.length - 1].result + ' (' + finalRes[0].DV + ')';
        $('#output').html(text);
    });
}
let handleInput = (inputString) => new Promise((resolve, reject) => {
    inputString = inputString.replace('1/', 'một phần ');
    inputString = inputString.toLowerCase();
    if (inputString.includes('đều')) {
        console.log(2);
        Frame2(inputString).then(result => {
            sentToServer(result);
        });
    } else if (inputString.includes('còn lại') || inputString.includes('còn')) {
        Frame5(inputString).then(result => {
            sentToServer(result);
        });
    }
    else {
        var flag = 0;
        for (const chars in listCharacterSpec) {
            for (const ch of listCharacterSpec[chars]) {
                if (inputString.includes(ch)) {
                    flag = 1;
                    Frame1(inputString).then(result => {
                        sentToServer(result);
                    });
                    break;
                }
            }
        }
        if (flag == 0) {

            if (inputString.includes('mỗi')) {
                console.log(3)
                Frame3(inputString).then(result => {
                    sentToServer(result);
                });
            } else {
                Frame6(inputString).then(result => {
                    console.log(result);
                    sentToServer(result);
                });
            }
        }
    }
    resolve(true);
})
