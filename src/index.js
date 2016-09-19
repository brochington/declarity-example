import declarity from 'declarity';
import Engine from './Engine';

const {Entity, register} = declarity;
/*
class Scene extends Entity {
    static actions = {
        getSomething: () => {
            // console.log('getSomething!!!!');
        }
    }

    willMount = () => {
        // console.log('willMount Scene');
    }

    didMount = () => {
        // console.log('didMount Scene');
    }
}

class SomethingSmall extends Entity {
    willMount = () => {
        // console.log('SomethingSmall mount');
    }
}

class Camera extends Entity {
    render() {
        return (
            <SomethingSmall />
        )
    }
}
*/
/*
const stuff = (
    <Engine something="here">
        <Scene myScene="awesome">
            <Camera />
            {[1, 2, 3, 4].map(i => <Camera />)}
        </Scene>
    </Engine>
);

console.log("stuff", stuff);

register(stuff);
*/
class Button extends Entity {
    /*
        This should all be in create(), and create() should block.
    */
    onButtonClick = () => {
        // console.log('get to onButtonClick', this);
        // this.actions.incrementCount();
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
        console.log("box will mount", this);
        this.stage = document.getElementById('stage');
        this.timer = document.createElement('div');
        this.timer.innerText = this.props.time;

        this.stage.appendChild(this.timer)
    }
    update = () => {
        console.log("box update", this);
        this.timer.innerText = this.props.time;
    }
}

class NullComponent extends Entity {
    render = () => {
        return (
            <Box />
        );
    }
}

// NOTE: must bind methods to the instance, like using arrow functions.
class Stage extends Entity {
    willMount = () => {
        // console.log('Stage did mount');
        // console.log(this);
        // this.actions.initCount();
    }
/*
    static actions = {
        initCount: (state, actions) => {
            // console.log('init count');
            return {count: 0};
        },
        incrementCount: (state, actions) => {
            // console.log('incrementCount!!!');
            // console.log('state', state(), {count: state().count + 1})
            return {count: state().count + 1}
        }
    }
*/
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
        // console.log('render');
        // const {count} = this.state;
        return [
            <Box time={Date.now()} />,
            <Button />
            // <Box time={Date.now()}>
            //     <NullComponent />
            // </Box>
        ];
    }
}



register(<Stage />);
