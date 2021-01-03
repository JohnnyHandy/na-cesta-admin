/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const fetchProducts = () => [
  {
    id: '1',
    model: 'Modelo 1',
    name: 'Biquini teste',
    type: 'biquini',
    description: 'Descrição: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididu',
    details: [
      {
        size: 'P',
        colors: [
          {
            colorId: 'vermelho',
            quantity: 10,
          },
          {
            colorId: 'verde',
            quantity: 15,
          },
        ],
      },
      {
        size: 'M',
        colors: [
          {
            colorId: 'azul',
            quantity: 5,
          },
          {
            colorId: 'verde',
            quantity: 15,
          },
        ],
      },
    ],
    price: 20,
    dealPrice: null,
    isDeal: false,
    images: [
      {
        id: '1',
        src: 'https://i.imgur.com/Lny39g6.jpg',
      },
      {
        id: '2',
        src: 'https://i.imgur.com/Lny39g6.jpg',
      },
      {
        id: '3',
        src: 'https://i.imgur.com/Lny39g6.jpg',
      },
    ],
  },
  {
    id: '2',
    model: 'Modelo 2',
    name: 'Maiô teste',
    type: 'maio',
    quantity: 10,
    description: 'Descrição: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididu',
    details: [
      {
        size: 'P',
        colors: [
          {
            colorId: 'vermelho',
            quantity: 10,
          },
          {
            colorId: 'verde',
            quantity: 15,
          },
        ],
      },
      {
        size: 'M',
        colors: [
          {
            colorId: 'azul',
            quantity: 5,
          },
          {
            colorId: 'verde',
            quantity: 15,
          },
        ],
      },
    ],
    price: 20,
    dealPrice: 15,
    isDeal: true,
    images: [
      {
        id: '1',
        src: 'https://i.imgur.com/V5PHrcw.jpg',
      },
      {
        id: '2',
        src: 'https://i.imgur.com/V5PHrcw.jpg',
      },
      {
        id: '3',
        src: 'https://i.imgur.com/V5PHrcw.jpg',
      },
    ],
  },
  {
    id: '3',
    model: 'Modelo 3',
    name: 'Saida teste',
    type: 'saida',
    quantity: 10,
    description: 'Descrição: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididu',
    details: [
      {
        size: 'P',
        colors: [
          {
            colorId: 'vermelho',
            quantity: 10,
          },
          {
            colorId: 'verde',
            quantity: 15,
          },
        ],
      },
      {
        size: 'M',
        colors: [
          {
            colorId: 'azul',
            quantity: 5,
          },
          {
            colorId: 'verde',
            quantity: 15,
          },
        ],
      },
    ],
    price: 20,
    dealPrice: 10,
    isDeal: false,
    images: [
      {
        id: '1',
        src: 'https://i.imgur.com/FSpxXRz.jpg',
      },
      {
        id: '2',
        src: 'https://i.imgur.com/FSpxXRz.jpg',
      },
      {
        id: '3',
        src: 'https://i.imgur.com/FSpxXRz.jpg',
      },
    ],
  },
];

export const getPreSignedUrl = ({ objectKey, type }) => {
  const options = {
    method: 'POST',
    url: 'https://lhpx7am1gk.execute-api.sa-east-1.amazonaws.com/dev/upload',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'allow',
    },
    data: {
      object_key: objectKey,
      type,
    },
  };
  return axios(options);
};

export const uploadImageWithSignedUrl = ({ url, data, type }) => {
  const options = {
    method: 'PUT',
    url,
    headers: {
      'Content-Type': type,
    },
    data,
  };
  return axios(options);
};
