import React, {Fragment} from "react";
import "draft-js/dist/Draft.css";
import "./RichEditor.css";
import {debounce} from 'lodash'; 
import InlineStyleControls from '../InlineStyleControls';
import BlockStyleControls from '../BlockStyleControls';
import { Editor, EditorState, convertFromRaw, convertToRaw, RichUtils, getDefaultKeyBinding } from "draft-js";

class RichEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState : null }
    this.focus = () => this.refs.editor.focus();
    this.onChange = this.onChange.bind(this); 
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    this.savingDebounced = debounce(this.save, 700); 
  }

  componentDidUpdate(prevProps){
    const {notes, selected} = this.props; 
    if((notes.length !== prevProps.notes.length) && notes.length){
      const contentState = convertFromRaw(notes[this.props.index].text);
      this.setState({editorState : EditorState.createWithContent(contentState)}) 
    }
    if(selected.index !== prevProps.selected.index){
      const contentState = convertFromRaw(notes[this.props.index].text);
      this.setState({editorState : EditorState.createWithContent(contentState)}) 
    }
  }

  onChange(editorState){
    let {notes, index} = this.props; 
    const contentState = convertToRaw(editorState.getCurrentContent());
    let title = ''; 
    const content = contentState.blocks[0].text;
    if(content.length <= 10) title = content;
    else title = `${content.slice(0,10)}...`; 
    notes[index] = {
      ...notes[index], title, text : contentState
    }; 
    this.props.dispatch(this.props.changeEditorState({
      notes, 
      index : this.props.index
    })); 
    this.setState({editorState}, ()=>{
      this.savingDebounced(); 
    }); 
  }

  save(){
    let {notes, selected} = this.props;  
    // call some action for the put api call 
    this.props.dispatch(this.props.saveNote(notes, selected))  
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4 /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  renderNotes(){ 
    const {editorState} = this.state; 
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = "RichEditor-editor";
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== "unstyled"
      ) {
        className += " RichEditor-hidePlaceholder";
      }
    }
    return (
      <div className="RichEditor-root">
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <div className={className} onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.mapKeyToEditorCommand}
            onKeyDown={(e)=>console.log(e)}
            onChange={this.onChange}
            placeholder="Tell a story..."
            ref="editor"
            spellCheck={true}
          />
        </div>
      </div>
    )
  }

  render() {
    const { notes } = this.props;
    return (
      <Fragment>
      {notes.length && this.state.editorState ? this.renderNotes() : <div>Please Add Or Choose a Note</div>} 
      </Fragment>
    );
  }
}
// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};
function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

export default RichEditor; 