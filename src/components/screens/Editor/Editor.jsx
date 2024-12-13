import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import EditorJS from "@editorjs/editorjs";
import EditorjsList from "@editorjs/list";
import Table from "@editorjs/table";
import Delimiter from "@editorjs/delimiter";
import RawTool from "@editorjs/raw";
import Marker from "@editorjs/marker";
import Checklist from "@editorjs/checklist";
import { useEffect, useRef, useState } from "react";
import { ENV } from "../../../utils/constants";
import PropTypes from "prop-types";

export const Editor = ({
  editable = true,
  baseData = null,
  onChangeData = () => {},
  placeholder = "",
}) => {
  Editor.propTypes = {
    editable: PropTypes.bool,
    baseData: PropTypes.object,
    onChangeData: PropTypes.func,
    placeholder: PropTypes.string,
  };

  const [data, setData] = useState(baseData);

  const ejInstance = useRef();
  const initEditor = () => {
    const editor = new EditorJS({
      readOnly: !editable,
      holder: "editorjs",
      placeholder: placeholder,
      data: typeof data === "string" ? JSON.parse(data) : data,
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      onChange: async (api) => {
        const new_data = await api.saver.save();
        setData(new_data);
        onChangeData(new_data);
      },
      inlineToolbar: true,
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: "Enter a header",
            levels: [1, 2, 3, 4],
            defaultLevel: 2,
          },
        },
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: ENV.BASE_PATH + "/uploadFile", // Your backend file uploader endpoint
            },
          },
        },
        list: {
          class: EditorjsList,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3,
            maxRows: 5,
            maxCols: 5,
          },
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        Marker: {
          class: Marker,
          shortcut: "CMD+SHIFT+M",
        },
        delimiter: Delimiter,
        raw: RawTool,
      },
    });
  };

  useEffect(() => {
    initEditor();
    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  return (
    <div
      id="editorjs"
      style={{
        width: "100%",
      }}
    ></div>
  );
};
