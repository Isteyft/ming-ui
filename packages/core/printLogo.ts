export default function () {
  if (PROD) {
    const logo = `
_______________________________________________________________________
                                                                                                                                                                                          

888888b.            d8b                          888     888 8888888 
888  "88b           Y8P                          888     888   888   
888  .88P                                        888     888   888   
8888888K.   8888b.  888 88888888  .d88b.         888     888   888   
888  "Y88b     "88b 888    d88P  d8P  Y8b        888     888   888   
888    888 .d888888 888   d88P   88888888 888888 888     888   888   
888   d88P 888  888 888  d88P    Y8b.            Y88b. .d88P   888   
8888888P"  "Y888888 888 88888888  "Y8888          "Y88888P"  8888888 
                                                                    

_______________________________________________________________________
                               author:Isteyft
`;

    const rainbowGradient = `
background: linear-gradient(135deg, orange 60%, cyan);
background-clip: text;
color: transparent;
font-size: 16px; 
line-height: 1;
font-family: monospace;
font-weight: 600;
`;

    console.info(`%c${logo}`, rainbowGradient);
  } else if (DEV) {
    console.log("[Baize-UI]:dev mode...");
  }
}