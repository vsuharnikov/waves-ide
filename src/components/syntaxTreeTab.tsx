import JSONTree from 'react-json-tree'
import { palette } from '../style';
import * as React from 'react'
import { Store } from 'redux'
import { connect } from 'react-redux'
import { IAppState } from './../state'
import { contextAware } from './../utils/contextAware'

const theme = {
  base00: '#FFFFFF', //background
  base01: '#383830',
  base02: '#49483e',
  base03: '#FFFFFF', //ITEM_STRING_EXPANDED_COLOR 75715e
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: palette.primary1Color, //TEXT_COLOR
  base08: '#f92672', //NULL_COLOR, UNDEFINED_COLOR, FUNCTION_COLOR, SYMBOL_COLOR
  base09: '#fd971f', //NUMBER_COLOR, BOOLEAN_COLOR
  base0A: '#f4bf75',
  base0B: '#75715e', //STRING_COLOR, DATE_COLOR, ITEM_STRING_COLOR
  base0C: '#a1efe4',
  base0D: palette.primary1Color, //ARROW_COLOR, LABEL_COLOR
  base0E: '#ae81ff',
  base0F: '#cc6633'
}

const regexp = new RegExp('\"', 'g')

const mapStateToProps = (state: IAppState) => {
  const editor = state.coding.editors[state.coding.selectedEditor]
  return {
    ast: !editor.compilationResult || editor.compilationResult.error ? { type: 'NON_COMPILABLE' } : editor.compilationResult.ast
  }
}

const syntaxTreeTab = ({ ast }) => {
  return <JSONTree
    data={ast}
    theme={theme}
    invertTheme={false}
    getItemString={(type, data: any, itemType, itemString) => <span>{data.type ? data.type : data.name}</span>}
    labelRenderer={l => <span>{l[0]}</span>}
    valueRenderer={v => <span>{v.toString().replace(regexp, '')}</span>}
  />
}

export const SyntaxTreeTab = connect(mapStateToProps)(syntaxTreeTab)
