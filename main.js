const preview = document.getElementById('preview'),
    styles = document.getElementById('styles'),
    ranges = document.querySelectorAll('.settings input'),
    copyButton = document.getElementById('copy-styles');

ranges.forEach((slider) => {
    slider.addEventListener('input', generateStyles);
})

//function to generate and update styles

function generateStyles(){
    const xShadow = document.getElementById('x-shadow').value;
    const yShadow = document.getElementById('y-shadow').value;
    const blurRadius = document.getElementById('blur-r').value;
    const spreadRadius = document.getElementById('spread-r').value;
    const shadowColor = document.getElementById('shadow-color').value;
    const shadowInset = document.getElementById('inset-shadow').checked;
    const shadowOpacity = document.getElementById('shadow-opacity').value;
    const borderRadius = document.getElementById('border-r').value;

    //create the box shadow CSS property value
    const boxShadow = `${shadowInset ? "inset " : ""} ${xShadow}px ${yShadow}px ${blurRadius}px ${spreadRadius}px ${hexToRgba(shadowColor, shadowOpacity)}`;

    //update the preview element styles
    preview.style.boxShadow = boxShadow;
    preview.style.borderRadius = `${borderRadius}px`;

    //update textarrea with generated style
    styles.textContent = `box-shadow: ${boxShadow};
    \n border-radius: ${borderRadius}px`;
}

// function to convert hex color and opacityy to rgba format
function hexToRgba(shadowColor, shadowOpacity){
    const r = parseInt(shadowColor.substr(1, 2), 16);
    const g = parseInt(shadowColor.substr(3, 2), 16);
    const b = parseInt(shadowColor.substr(5, 2), 16);

    return `rgba(${r}, ${g}, ${b}, ${shadowOpacity})`;
}

//function to copy the generated style
function copyStyles(){
    styles.select();
    document.execCommand('copy');
    copyButton.innerText = "copied"

    setTimeout(() => {
        copyButton.innerText = "Copy Style"
    }, 500)
}

generateStyles();