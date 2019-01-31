const randomIndex = (upperBound) =>{
    return Math.floor(Math.random() * Math.floor(upperBound))
}

const capitalise = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1)
}