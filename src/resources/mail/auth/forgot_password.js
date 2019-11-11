window.onload = () =>{
    const link = document.getElementsByTagName("a")[0];
    try {
        link.href = `${process.env.REACT_APP_URL}/reset-password?token={{token}}`; 
    } catch (error) {
        link.href = 'http://localhost:3000/reset-password?token={{token}}';
    }
}


