function calculateLuminance(r, g, b) {
    const rl = 0.03928;

    r = r / 255;
    g = g / 255;
    b = b / 255;

    if (r <= rl) {
        r /= 12.92;
    } else {
        r = ((r + 0.055) / 1.055) ** 2.4;
    }

    if (g <= rl) {
        g /= 12.92;
    } else {
        g = ((g + 0.055) / 1.055) ** 2.4;
    }

    if (b <= rl) {
        b /= 12.92;
    } else {
        b = ((b + 0.055) / 1.055) ** 2.4;
    }

    return r * 0.2126 + g * 0.7152 + b * 0.0722;
}

const white = calculateLuminance(255, 255, 255);
const black = calculateLuminance(0, 0, 0);

function calculateContrastRatio(l1, l2) {
    return l1 < l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
}

const ratio7 = 0.14285;
const ratio45 = 0.22222;
const ratio30 = 0.33333;

const contrastRatio = calculateContrastRatio(white, black);

console.log(contrastRatio);
console.log(`Passes 7:1: ${contrastRatio < ratio7}\n`);
console.log(`Passes 4.5:1: ${contrastRatio < ratio45}\n`);
console.log(`Passes 3.0:1: ${contrastRatio < ratio30}\n`);
