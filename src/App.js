import React, { Component } from 'react';
import './App.css';

import { EditorState, RichUtils } from 'draft-js';
import Editor from 'draft-js-plugins-editor';

import createUndoPlugin 				from 'draft-js-undo-plugin';
import createRichButtonsPlugin 	from 'draft-js-richbuttons-plugin';

const undoPlugin = createUndoPlugin();
const richButtonsPlugin = createRichButtonsPlugin();

const { UndoButton, RedoButton } = undoPlugin;
const {   
  // inline buttons
	BoldButton
	// , MonospaceButton, UnderlineButton,
  // block buttons
  // ParagraphButton, BlockquoteButton, CodeButton, OLButton, ULButton, H1Button, H2Button, H3Button, H4Button, H5Button, H6Button
} = richButtonsPlugin;

const plugins = [
	undoPlugin,
	richButtonsPlugin
];

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {editorState: EditorState.createEmpty()}
	}

	onChange() {
		return (editorState) => {
			this.setState({editorState})
		}
	}

	toggleInlineStyle() {
		return (inlineStyle) => {
			console.log(inlineStyle)
			return RichUtils.toggleInlineStyle(
				this.state.editorState,
				inlineStyle
			)
		}
	}

	render() {
		let editorState = this.state.editorState;

		return (
			<div>
				<h1 className="title">Draft JS - Plugins</h1>
				<div className="editor-content">
					
					<Editor
						className="editor"
						editorState={editorState}
						onChange={this.onChange()}
						plugins={plugins} 
					/>

					<div className="editor-toolbar">
						<BoldButton />
						<UndoButton className="inline-button" />
						<RedoButton className="inline-button" />
					</div>
				</div>
			</div>
		);
	}
}

export default App;
