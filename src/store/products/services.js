

export const fetchProducts = () => [
    {
        id: '1',
        model: 'Modelo 1',
        name: 'Biquini teste',
        type: 'biquini',
        description: 'Descrição: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididu',
        details: [
            {
                measure: 'P',
                colors: ['vermelho', 'verde']
            },
            {
                measure: 'M',
                colors: ['azul', 'verde']
            },
        ],
        price: 20,
        dealPrice: null,
        isDeal: false,
        images: [
            {
                id: '1',
                src: 'https://i.imgur.com/Lny39g6.jpg'
            },
            {
                id: '2',
                src: 'https://i.imgur.com/Lny39g6.jpg'
            },
            {
                id: '3',
                src: 'https://i.imgur.com/Lny39g6.jpg'
            }
        ]
    },
    {
        id: '2',
        model: 'Modelo 2',
        name: 'Maiô teste',
        type: 'maio',
        description: 'Descrição: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididu',
        details: [
            {
                measure: 'P',
                colors: ['vermelho', 'verde']
            },
            {
                measure: 'M',
                colors: ['azul', 'verde']
            },
        ],
        price: 20,
        dealPrice: 15,
        isDeal: true,
        images: [
            {
                id: '1',
                src: 'https://i.imgur.com/V5PHrcw.jpg'
            },
            {
                id: '2',
                src: 'https://i.imgur.com/V5PHrcw.jpg'
            },
            {
                id: '3',
                src: 'https://i.imgur.com/V5PHrcw.jpg'
            }
        ]
    },
    {
        id: '3',
        model: 'Modelo 3',
        name: 'Saida teste',
        type: 'saida',
        description: 'Descrição: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididu',
        details: [
            {
                measure: 'P',
                colors: ['vermelho', 'verde']
            },
            {
                measure: 'M',
                colors: ['azul', 'verde']
            },
        ],
        price: 20,
        dealPrice: 10,
        isDeal: false,
        images: [
            {
                id: '1',
                src: 'https://i.imgur.com/FSpxXRz.jpg'
            },
            {
                id: '2',
                src: 'https://i.imgur.com/FSpxXRz.jpg'
            },
            {
                id: '3',
                src: 'https://i.imgur.com/FSpxXRz.jpg'
            }
        ]
    }
]