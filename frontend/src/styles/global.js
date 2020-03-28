import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

    * {
        margin:0;
        padding:0;
        outline:0;
        box-sizing:0;
        font-family: 'Roboto', sans-serif;
        box-sizing: border-box;
    }

    html, body, #root {
        min-height:100%;
    }

    body {
        min-height:100%;
        font-size: 14px;
        font-weight: 400;
        background: #f0f0f5
    }

    input, textarea, button {
        font-size: 18px
    }

    button {
        cursor: pointer;
    }

    form input {
        width: 100%;
        height: 60px;
        color: #333;
        border: 1px solid #dcdce6;
        border-radius: 8px;
        padding: 0 24px;
    }

    form textarea {
        width: 100%;
        min-height: 140px;
        resize: vertical;
        color: #333;
        border: 1px solid #dcdce6;
        border-radius: 8px;
        padding: 16px 24px;
        line-height: 24px
    }

    .btn {
        width: 100%;
        height: 60px;
        border: 0;
        border-radius: 8px;
        padding: 0 24px;
        background: #e02041;
        color: #fff;
        font-weight: bold;
        margin-top: 16px;
        display: inline-block;
        text-align: center;
        text-decoration: none;
        font-size: 18px;
        line-height: 60px;
        transition: filter .2s;
        position: relative;
        transition: background .5s;
    }

    .btn[disabled] {
        cursor: not-allowed;
    }

    .btn:hover {
        filter: brightness(90%)
    }

    .back-link {
        display: flex;
        align-items: center;
        margin-top: 40px;
        color: #41414d;
        font-size: 18px;
        text-decoration: none;
        font-weight: 500;
        transition: opacity .2s;
    }

    .back-link:hover {
        opacity: .8;
    }

    .back-link svg {
        margin-right: 8px;
    }
`
