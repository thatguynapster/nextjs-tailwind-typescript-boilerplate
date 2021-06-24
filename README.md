# NextJS Tailwind Typescript Boilerplate

This repository contains the boilerplate code for setting up a nextjs project with tailwind and typescript.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before we get started, we're going to need to make sure we have a few things installed and available on our machine.

#### Node >= 12

##### MacOS

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

##### Other

See the installation guides available @ nodejs.org:

https://nodejs.org/en/download/package-manager/

#### Yarn

```bash
npm i -g yarn
```

### Installing

Below is a series of step by step instructions that tell you how to get a development env running.

Create a local clone of the repository

```bash
git clone https://Napster94@bitbucket.org/Napster94/nextjs-tailwind-typescript-boilerplate.git
```

Enter the cloned repositories' directory

```bash
cd nextjs-tailwind-typescript-boilerplate
```

Install the projects dependencies

```bash
yarn
```

Create a `.env` file based on the [.env.example template](.env.example)

Start the projects development server

```bash
yarn dev
```

The project should now be available at http://localhost:4800

## Environment Variables

These are the environment variables required to successfully deploy the application.

### Repository Variables

| key                        | description                 |
| -------------------------- | --------------------------- |
| NEXT_PUBLIC_BASE_URL       | The base url for API routes |
| NEXT_PUBLIC_GOOGLE_API_KEY | Google services API key     |

## Built With

Details of the tech stack that has been used.

- [NextJS](https://nextjs.org/) - Client Framework

## Architecture

A basic architecture diagram or description of the chosen architecture should be detailed here.
[Coming Soon!]

## Authors

- **Napster** <andrewosei94@gmail.com>
- **Albert Akrong** <albert@rootsdigital.tech>
- **Robert Quainoo** <robert@rootsdigital.tech>

## Licenses

Place the result of `npx license-checker --summary` here

```
├─ MIT: 1072
├─ ISC: 61
├─ BSD-3-Clause: 35
├─ Apache-2.0: 28
├─ BSD-2-Clause: 22
├─ (MIT OR CC0-1.0): 5
├─ CC-BY-4.0: 2
├─ CC0-1.0: 2
├─ (MIT OR Apache-2.0): 1
├─ BSD*: 1
├─ Apache*: 1
├─ MIT OR GPL-2.0-or-later: 1
├─ AFLv2.1,BSD: 1
├─ WTFPL: 1
├─ (MIT AND Zlib): 1
├─ (WTFPL OR MIT): 1
├─ (MIT AND BSD-3-Clause): 1
├─ CC-BY-3.0: 1
├─ 0BSD: 1
└─ Unlicense: 1
```

## Troubleshooting

Below are a few common issues users experience - including an overview of their possible cause and solutions.
