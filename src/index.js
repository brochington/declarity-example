import declarity from 'declarity';

const {Entity, register} = declarity;

class Button extends Entity {
    /*
        This should all be in create(), and create() should block.
    */
    onButtonClick = () => {
        console.log('get to onButtonClick', this);
        this.actions.incrementCount();
    }

    /**/
    create = () => {
        // console.log('button create');
        const stage = document.getElementById('stage');
        const button = document.createElement('button');
        button.innerText = "my button";
        button.addEventListener('click', this.onButtonClick);

        stage.appendChild(button);
        return {
            button,
            stage
        }
    }
}

class Box extends Entity {
    willMount = () => {
        this.stage = document.getElementById('stage');
        this.timer = document.createElement('div');
        this.timer.innerText = this.props.time;

        this.stage.appendChild(this.timer)
    }
    update = () => {
        this.timer.innerText = this.props.time;
    }
}

// NOTE: must bind methods to the instance, like using arrow functions.
class Stage extends Entity {
    willMount = () => {
        this.actions.initCount();
    }

    static actions = {
        initCount: (state, actions) => {
            return {count: 0};
        },
        incrementCount: (state, actions) => {
            return {count: state().count + 1}
        }
    }

    /* Hopefully either a regular, async, or generator function */
    create = () => {
        return {
            count: 0
        }
    }
    /*
        render is called after create is all done.
    */
    render = () => {

        return [
            <Box key="one" time={Date.now()} />,
            (this.state.count % 2 ? <Box key="two" time={this.state.count} /> : null),
            // <Box time={this.state.count} />,
            <Button key="three"/>
        ];
    }
}

register(<Stage />);
