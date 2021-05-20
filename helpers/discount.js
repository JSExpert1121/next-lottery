const discounts = {
    'BonoLoto': {
        'single': {
            1: 2,
            2: 7,
            4: 10,
        },
        'group': {
            1: 2,
            2: 7,
            4: 10,
        },
    },
    'SuperEnalotto': {
        'single': {
            1: 0,
            2: 2,
            4: 7,
        },
        'group': {
            1: 0,
            2: 2,
            4: 7,
        },
    },
    'ElGordo': {
        'single': {
            1: 0,
            2: 0,
            4: 0,
        },
        'group': {
            1: 0,
            2: 0,
            4: 0,
        },
    },
    'EuroJackpot': {
        'single': {
            1: 0,
            2: 0,
            4: 0,
        },
        'group': {
            1: 0,
            2: 0,
            4: 0,
        },
    },
    'PowerBall': {
        'single': {
            1: 0,
            2: 0,
            4: 5,
        },
        'group': {
            1: 0,
            2: 0,
            4: 5,
        },
    },
    'LaPrimitiva': {
        'single': {
            1: 0,
            2: 0,
            4: 5,
        },
        'group': {
            1: 0,
            2: 0,
            4: 5,
        },
    },
    'MegaMillions': {
        'single': {
            1: 0,
            2: 0,
            4: 5,
        },
        'group': {
            1: 0,
            2: 0,
            4: 5,
        },
    },
    'Lotto649': {
        'single': {
            1: 0,
            2: 0,
            4: 5,
        },
        'group': {
            1: 0,
            2: 0,
            4: 5,
        },
    },
    'UkLotto': {
        'single': {
            1: 0,
            2: 0,
            4: 5,
        },
        'group': {
            1: 0,
            2: 0,
            4: 5,
        },
    },
    'NewYorkLotto': {
        'single': {
            1: 0,
            2: 0,
            4: 5,
        },
        'group': {
            1: 0,
            2: 0,
            4: 5,
        },
    },
    'OzLotto': {
        'single': {
            1: 0,
            2: 0,
            4: 0,
        },
        'group': {
            1: 0,
            2: 0,
            4: 0,
        },
    },
    'EuroMillions': {
        'single': {
            1: 0,
            2: 0,
            4: 5,
        },
        'group': {
            1: 0,
            2: 0,
            4: 5,
        },
    },
};

export const get_discounts = (name, type, period) => {
    const item = discounts[name];
    if (!item) return period + ' week';
    const discount = item[type][period];
    return (discount > 0) ? period + ' week ' + discount + '% discount' : period + ' week';
}
