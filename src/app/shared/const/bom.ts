// bom steht für bill of material (dt. Stückliste)
export const bomCompactP1 = {
  1: { type: 'p', amount: 1 },
  4: { type: 'e', amount: 1 },
  7: { type: 'e', amount: 1 },
  10: { type: 'e', amount: 1 },
  13: { type: 'e', amount: 1 },
  16: { type: 'e', amount: 1 },
  17: { type: 'e', amount: 1 },
  18: { type: 'e', amount: 1 },
  26: { type: 'e', amount: 1 },
  49: { type: 'e', amount: 1 },
  50: { type: 'e', amount: 1 },
  51: { type: 'e', amount: 1 },
  21: { type: 'k', amount: 1 },
  24: { type: 'k', amount: 7 },
  25: { type: 'k', amount: 4 },
  27: { type: 'k', amount: 2 },
  28: { type: 'k', amount: 4 },
  32: { type: 'k', amount: 3 },
  35: { type: 'k', amount: 4 },
  36: { type: 'k', amount: 1 },
  37: { type: 'k', amount: 1 },
  38: { type: 'k', amount: 1 },
  39: { type: 'k', amount: 2 },
  40: { type: 'k', amount: 1 },
  41: { type: 'k', amount: 1 },
  42: { type: 'k', amount: 2 },
  43: { type: 'k', amount: 1 },
  44: { type: 'k', amount: 3 },
  45: { type: 'k', amount: 1 },
  46: { type: 'k', amount: 1 },
  47: { type: 'k', amount: 1 },
  48: { type: 'k', amount: 2 },
  52: { type: 'k', amount: 2 },
  53: { type: 'k', amount: 72 },
  59: { type: 'k', amount: 2 },
};

export const bomCompactP2 = {
  1: { type: 'p', amount: 1 },
  5: { type: 'e', amount: 1 },
  8: { type: 'e', amount: 1 },
  11: { type: 'e', amount: 1 },
  14: { type: 'e', amount: 1 },
  16: { type: 'e', amount: 1 },
  17: { type: 'e', amount: 1 },
  19: { type: 'e', amount: 1 },
  26: { type: 'e', amount: 1 },
  54: { type: 'e', amount: 1 },
  55: { type: 'e', amount: 1 },
  56: { type: 'e', amount: 1 },
  22: { type: 'k', amount: 1 },
  24: { type: 'k', amount: 7 },
  25: { type: 'k', amount: 4 },
  27: { type: 'k', amount: 2 },
  28: { type: 'k', amount: 5 },
  32: { type: 'k', amount: 3 },
  35: { type: 'k', amount: 4 },
  36: { type: 'k', amount: 1 },
  37: { type: 'k', amount: 1 },
  38: { type: 'k', amount: 1 },
  39: { type: 'k', amount: 2 },
  40: { type: 'k', amount: 1 },
  41: { type: 'k', amount: 1 },
  42: { type: 'k', amount: 2 },
  43: { type: 'k', amount: 1 },
  44: { type: 'k', amount: 3 },
  45: { type: 'k', amount: 1 },
  46: { type: 'k', amount: 1 },
  47: { type: 'k', amount: 1 },
  48: { type: 'k', amount: 2 },
  57: { type: 'k', amount: 2 },
  58: { type: 'k', amount: 72 },
  59: { type: 'k', amount: 2 },
};

export const bomCompactP3 = {
  3: { type: 'p', amount: 1 },
  6: { type: 'e', amount: 1 },
  9: { type: 'e', amount: 1 },
  12: { type: 'e', amount: 1 },
  15: { type: 'e', amount: 1 },
  16: { type: 'e', amount: 1 },
  17: { type: 'e', amount: 1 },
  20: { type: 'e', amount: 1 },
  26: { type: 'e', amount: 1 },
  29: { type: 'e', amount: 1 },
  30: { type: 'e', amount: 1 },
  31: { type: 'e', amount: 1 },
  23: { type: 'k', amount: 1 },
  24: { type: 'k', amount: 7 },
  25: { type: 'k', amount: 4 },
  27: { type: 'k', amount: 2 },
  28: { type: 'k', amount: 6 },
  32: { type: 'k', amount: 3 },
  33: { type: 'k', amount: 2 },
  34: { type: 'k', amount: 72 },
  35: { type: 'k', amount: 4 },
  36: { type: 'k', amount: 1 },
  37: { type: 'k', amount: 1 },
  38: { type: 'k', amount: 1 },
  39: { type: 'k', amount: 2 },
  40: { type: 'k', amount: 1 },
  41: { type: 'k', amount: 1 },
  42: { type: 'k', amount: 2 },
  43: { type: 'k', amount: 1 },
  44: { type: 'k', amount: 3 },
  45: { type: 'k', amount: 1 },
  46: { type: 'k', amount: 1 },
  47: { type: 'k', amount: 1 },
  48: { type: 'k', amount: 2 },
  59: { type: 'k', amount: 2 },
};

export const bomDetailedP1 = {
  id: 1,
  amount: 1,
  requiredKItems: [
    { id: 21, amount: 1 },
    { id: 24, amount: 1 },
    { id: 27, amount: 1 },
  ],
  requiredEItems: [
    {
      id: 26,
      amount: 1,
      requiredKItems: [
        {
          id: 44,
          amount: 2,
        },
        {
          id: 47,
          amount: 1,
        },
        {
          id: 48,
          amount: 2,
        },
      ],
      requiredEItems: [],
    },
    {
      id: 51,
      amount: 1,
      requiredKItems: [
        { id: 24, amount: 1 },
        { id: 27, amount: 1 },
      ],
      requiredEItems: [
        {
          id: 16,
          amount: 1,
          requiredKItems: [
            { id: 24, amount: 1 },
            { id: 28, amount: 1 },
            { id: 40, amount: 1 },
            { id: 41, amount: 1 },
            { id: 42, amount: 2 },
          ],
          requiredEItems: [],
        },
        {
          id: 17,
          amount: 1,
          requiredKItems: [
            { id: 43, amount: 1 },
            { id: 44, amount: 1 },
            { id: 45, amount: 1 },
            { id: 46, amount: 1 },
          ],
          requiredEItems: [],
        },
        {
          id: 50,
          amount: 1,
          requiredKItems: [
            { id: 24, amount: 2 },
            { id: 25, amount: 2 },
          ],
          requiredEItems: [
            {
              id: 4,
              amount: 1,
              requiredKItems: [
                { id: 35, amount: 2 },
                { id: 36, amount: 1 },
                { id: 52, amount: 1 },
                { id: 53, amount: 36 },
              ],
              requiredEItems: [],
            },
            {
              id: 10,
              amount: 1,
              requiredKItems: [
                { id: 32, amount: 1 },
                { id: 39, amount: 1 },
              ],
              requiredEItems: [],
            },
            {
              id: 49,
              amount: 1,
              requiredKItems: [
                { id: 24, amount: 2 },
                { id: 25, amount: 2 },
              ],
              requiredEItems: [
                {
                  id: 7,
                  amount: 1,
                  requiredKItems: [
                    { id: 35, amount: 2 },
                    { id: 37, amount: 1 },
                    { id: 38, amount: 1 },
                    { id: 52, amount: 1 },
                    { id: 53, amount: 36 },
                  ],
                  requiredEItems: [],
                },
                {
                  id: 13,
                  amount: 1,
                  requiredKItems: [
                    { id: 32, amount: 1 },
                    { id: 39, amount: 1 },
                  ],
                  requiredEItems: [],
                },
                {
                  id: 18,
                  amount: 1,
                  requiredKItems: [
                    { id: 28, amount: 3 },
                    { id: 32, amount: 1 },
                    { id: 59, amount: 2 },
                  ],
                  requiredEItems: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const bomDetailedP2 = {
  id: 2,
  amount: 1,
  requiredKItems: [
    { id: 22, amount: 1 },
    { id: 24, amount: 1 },
    { id: 27, amount: 1 },
  ],
  requiredEItems: [
    {
      id: 26,
      amount: 1,
      requiredKItems: [
        {
          id: 44,
          amount: 2,
        },
        {
          id: 47,
          amount: 1,
        },
        {
          id: 48,
          amount: 2,
        },
      ],
      requiredEItems: [],
    },
    {
      id: 56,
      amount: 1,
      requiredKItems: [
        { id: 24, amount: 1 },
        { id: 27, amount: 1 },
      ],
      requiredEItems: [
        {
          id: 16,
          amount: 1,
          requiredKItems: [
            { id: 24, amount: 1 },
            { id: 28, amount: 1 },
            { id: 40, amount: 1 },
            { id: 41, amount: 1 },
            { id: 42, amount: 2 },
          ],
          requiredEItems: [],
        },
        {
          id: 17,
          amount: 1,
          requiredKItems: [
            { id: 43, amount: 1 },
            { id: 44, amount: 1 },
            { id: 45, amount: 1 },
            { id: 46, amount: 1 },
          ],
          requiredEItems: [],
        },
        {
          id: 55,
          amount: 1,
          requiredKItems: [
            { id: 24, amount: 2 },
            { id: 25, amount: 2 },
          ],
          requiredEItems: [
            {
              id: 5,
              amount: 1,
              requiredKItems: [
                { id: 35, amount: 2 },
                { id: 36, amount: 1 },
                { id: 57, amount: 1 },
                { id: 58, amount: 36 },
              ],
              requiredEItems: [],
            },
            {
              id: 11,
              amount: 1,
              requiredKItems: [
                { id: 32, amount: 1 },
                { id: 39, amount: 1 },
              ],
              requiredEItems: [],
            },
            {
              id: 54,
              amount: 1,
              requiredKItems: [
                { id: 24, amount: 2 },
                { id: 25, amount: 2 },
              ],
              requiredEItems: [
                {
                  id: 8,
                  amount: 1,
                  requiredKItems: [
                    { id: 35, amount: 2 },
                    { id: 37, amount: 1 },
                    { id: 38, amount: 1 },
                    { id: 57, amount: 1 },
                    { id: 58, amount: 36 },
                  ],
                  requiredEItems: [],
                },
                {
                  id: 14,
                  amount: 1,
                  requiredKItems: [
                    { id: 32, amount: 1 },
                    { id: 39, amount: 1 },
                  ],
                  requiredEItems: [],
                },
                {
                  id: 19,
                  amount: 1,
                  requiredKItems: [
                    { id: 28, amount: 4 },
                    { id: 32, amount: 1 },
                    { id: 59, amount: 2 },
                  ],
                  requiredEItems: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const bomDetailedP3 = {
  id: 3,
  amount: 1,
  requiredKItems: [
    { id: 23, amount: 1 },
    { id: 24, amount: 1 },
    { id: 27, amount: 1 },
  ],
  requiredEItems: [
    {
      id: 26,
      amount: 1,
      requiredKItems: [
        {
          id: 44,
          amount: 2,
        },
        {
          id: 47,
          amount: 1,
        },
        {
          id: 48,
          amount: 2,
        },
      ],
      requiredEItems: [],
    },
    {
      id: 31,
      amount: 1,
      requiredKItems: [
        { id: 24, amount: 1 },
        { id: 27, amount: 1 },
      ],
      requiredEItems: [
        {
          id: 16,
          amount: 1,
          requiredKItems: [
            { id: 24, amount: 1 },
            { id: 28, amount: 1 },
            { id: 40, amount: 1 },
            { id: 41, amount: 1 },
            { id: 42, amount: 2 },
          ],
          requiredEItems: [],
        },
        {
          id: 17,
          amount: 1,
          requiredKItems: [
            { id: 43, amount: 1 },
            { id: 44, amount: 1 },
            { id: 45, amount: 1 },
            { id: 46, amount: 1 },
          ],
          requiredEItems: [],
        },
        {
          id: 30,
          amount: 1,
          requiredKItems: [
            { id: 24, amount: 2 },
            { id: 25, amount: 2 },
          ],
          requiredEItems: [
            {
              id: 6,
              amount: 1,
              requiredKItems: [
                { id: 33, amount: 1 },
                { id: 34, amount: 36 },
                { id: 35, amount: 2 },
                { id: 36, amount: 1 },
              ],
              requiredEItems: [],
            },
            {
              id: 12,
              amount: 1,
              requiredKItems: [
                { id: 32, amount: 1 },
                { id: 39, amount: 1 },
              ],
              requiredEItems: [],
            },
            {
              id: 29,
              amount: 1,
              requiredKItems: [
                { id: 24, amount: 2 },
                { id: 25, amount: 2 },
              ],
              requiredEItems: [
                {
                  id: 9,
                  amount: 1,
                  requiredKItems: [
                    { id: 33, amount: 2 },
                    { id: 34, amount: 36 },
                    { id: 35, amount: 2 },
                    { id: 37, amount: 1 },
                    { id: 38, amount: 1 },
                  ],
                  requiredEItems: [],
                },
                {
                  id: 15,
                  amount: 1,
                  requiredKItems: [
                    { id: 32, amount: 1 },
                    { id: 39, amount: 1 },
                  ],
                  requiredEItems: [],
                },
                {
                  id: 20,
                  amount: 1,
                  requiredKItems: [
                    { id: 28, amount: 5 },
                    { id: 32, amount: 1 },
                    { id: 59, amount: 2 },
                  ],
                  requiredEItems: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
