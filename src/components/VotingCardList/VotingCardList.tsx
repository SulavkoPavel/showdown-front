import './voting-card-list.css'
import VotingCard from "../VotingCard/VotingCard.tsx";
import {useEffect, useState} from "react";
import {getTable} from "../../api/tables.ts";
import {addOnNewGameHandler, addOnShowdownHandler, connectToWs} from "../../api/game.ts";

interface Props {
    votingSystem?: number[];
    onSelect: (voteValue: number) => void;
    onUnselect: (voteValue: number) => void;
    className?: string;
}

const VotingCardList = ({
                            votingSystem,
                            onSelect,
                            onUnselect,
                            className = ''
                        }: Props) => {
    const [selectedIndex, setSelectedIndex] = useState(-1);

    useEffect(() => {
        addOnShowdownHandler(payload => {
            setSelectedIndex(-1);
        });
    }, []);

    return (
        <div className={`voting-card-list ${className}`}>
            {votingSystem?.map((voteNumber, index) =>
                <VotingCard
                    text={voteNumber.toString()}
                    stateStyle={index === selectedIndex ? "selected" : "unselected"}
                    onClick={() => {
                        if (selectedIndex === index) {
                            setSelectedIndex(-1);
                            onUnselect(voteNumber);
                        } else {
                            setSelectedIndex(index);
                            onSelect(voteNumber);
                        }
                    }}
                />
            )}
        </div>
    )
}

export default VotingCardList