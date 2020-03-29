import styled from 'styled-components'
import React, { useState } from 'react'
// import Moment from 'moment';
import { isBrowser } from 'react-device-detect'


const Container = styled.div`
  position: absolute;
  z-index: 1000;
  bottom: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`
const LastUpdateSpan = styled.span`
  font-size: 12px;
   @media screen and (max-width: 768px) {
    display: none;
  }
`

function LastUpdate() {
    const [last_update, setLastUpdate] = useState(false)
    fetch('/api/last_update', {
        cors: 'no-cors',
        method: 'GET',
        redirect: 'follow',
    })
        .then(resp => resp.json())
        .then(res => {
            if(res.length >= 1){
                setLastUpdate(res[0].lastupdate);
            }
        })

    if(last_update) {
        return (
            <Container>
                {isBrowser ? (
                <LastUpdateSpan>
                    Dernière mise à jour: {last_update}
                </LastUpdateSpan>

                ) : null}
            </Container>
        )
    }

    return (null);

}


export default LastUpdate;
