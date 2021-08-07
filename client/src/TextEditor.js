import { useCallback } from 'react';
// import { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const TextEditor = () => {
    // const wrapperRef = useRef();
    
    // useEffect(() => {
    //     const editor = document.createElement("div");
    //     wrapperRef.current.append(editor);
    //     new Quill(editor, { theme: "snow" });

    //     return () => {
    //         wrapperRef.innerHTML = "";
    //     }
    //     //whjnekjdnekdm

    // }, [])

    const wrapperRef = useCallback((wrapper) => {
        
        if (wrapper === null) return
        wrapper.innerHTML = "";
        const editor = document.createElement("div");
        wrapper.append(editor);
        new Quill(editor, { theme: "snow" });
    
    }, [])

    return (
        <div id="container" ref={wrapperRef}>

        </div>
    )
};

export default TextEditor;
