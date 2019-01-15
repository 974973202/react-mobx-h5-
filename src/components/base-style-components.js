import styled from 'styled-components'

export const BaseIcon = styled.i`
  display: block;
  height: ${props => props.size || props.height || 15}px;
  width: ${props => props.size || props.width || 15}px;
  background: url(${props => props.source});
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: ${props => props.borderRadius || 0}%;
  overflow: hidden;
`

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  background-color: ${props => (props.color ? props.color : '#fff')};
`

  // margin-top: ${props => (props.marginTop ? props.marginTop : 45)}px;
