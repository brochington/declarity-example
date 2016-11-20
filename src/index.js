import declarity from 'declarity';
import Staction from 'staction';

const actions = {
    incrementClick: (state, actions) => {
        return {
            ...state(),
            count: state().count + 1
        };
    }
}

const {Entity, register} = declarity;

class Button extends Entity {
    /**/
    create = ({props}) => {
        const button = document.createElement('button');

        button.innerText = "my button";
        button.addEventListener('click', props.onButtonClick);

        props.stage.appendChild(button);

        return {
            button
        }
    }
}

class Box extends Entity {
    create = ({props}) => {
        const {stage} = props;
        const timer = document.createElement('div');
        timer.innerText = props.time;
        stage.appendChild(timer)

        return {
            timer
        }
    }

    didCreate

    willUnmount = ({props, state}) => {
        props.stage.removeChild(state.timer);
    }

    update = ({props, state}) => {
        state.timer.innerText = props.time;
    }
}

// NOTE: must bind methods to the instance, like using arrow functions.
class Stage extends Entity {
    /* Hopefully either a regular, async, or generator function */
    create = ({setState}) => {
        const stage = document.getElementById('stage');

        this.staction = new Staction();

        this.staction.init(
            actions,
            () => {return {count: 0}},
            (newState) => {
                setState(newState)
            }
        )

        return {
            stage,
        }
    }
    /*
        render is called after create is all done.
    */
    render = ({state}) => {
        const {actions} = this.staction;
        const {count} = this.staction.state;

        return [
            <Box key="one" stage={stage} time={Date.now()} />,
            <Box stage={stage} time={count} />,
            <Button key="three" stage={stage} onButtonClick={actions.incrementClick}/>
        ];
    }
}

register(<Stage />);
