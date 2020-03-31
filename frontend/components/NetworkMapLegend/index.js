import { useEffect } from 'react';
import styled from 'styled-components'
import {
    male_hosp,
    male_cured,
    male_dead,
    state_node,
    city_node,
    plane_abroad_node,
    plane_local_node,
} from '../../images'


const LegendContainer = styled.div`
    position: absolute;
    top: 0;
    left: 30%;
    display: flex;
    flex-direction: column;
    background: #fafafa;
    padding: 5px;
    border: 1px solid #e7e7e7;
    border-radius: 5px;
    margin-left: 5px;
    margin-top: 5px;
    z-index: 2;
    
    
    @media screen and (max-width: 768px) {
        padding: 4px;
        left 0%;
    }
`


const Image = styled.img`
    height: 25px;
    
    @media screen and (max-width: 768px) {
        height: 8.75px;
    }
`

const ImageContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;


    & :last-of-type {
        margin-bottom: 0;
    }
`

const Label = styled.span`
    font-family: 'Lato', sans-serif;
    font-size: 12px;
    margin-left: 0.3rem;
    
    @media screen and (max-width: 768px) {
        font-size: 7px;
    }
`

const NetworkMapLegend = ({ currentFilter }) => {
    return (
        <LegendContainer>
            <ImageContainer>
                <Image src={male_cured} />
                <Label>Rétabli</Label>
            </ImageContainer>
            <ImageContainer>
                <Image src={male_hosp} />
                <Label>Actif</Label>
            </ImageContainer>
            <ImageContainer>
                <Image src={male_dead} />
                <Label>Décès</Label>
            </ImageContainer>
            {['Gouvernorat', 'Ville'].includes(currentFilter) ?
                <ImageContainer>
                    <Image src={state_node} />
                    <Label>Gouvernorat</Label>
                </ImageContainer>
                : null
            }
            {currentFilter === 'Ville' ?
                <ImageContainer>
                    <Image src={city_node} />
                    <Label>Ville</Label>
                </ImageContainer>
                : null
            }
            {currentFilter === 'Provenance' ?
                <>
                    <ImageContainer>
                        <Image src={plane_local_node} />
                        <Label>Locale</Label>
                    </ImageContainer>
                    <ImageContainer>
                        <Image src={plane_abroad_node} />
                        <Label>Internationale</Label>
                    </ImageContainer>
                </>
                : null
            }
        </LegendContainer>
    )
}


export default NetworkMapLegend;
