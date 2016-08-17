import declarity from 'declarity';
import Engine from './Engine';

const {Entity, register} = declarity;

class Scene extends Entity {
    static actions = {
        getSomething: () => {
            console.log('getSomething!!!!');
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
        console.log('SomethingSmall mount');
    }
}

class Camera extends Entity {
    render() {
        return (
            <SomethingSmall />
        )
    }
}
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
        console.log('get to onButtonClick', this);
        this.actions.incrementCount();
    }

    /**/
    create = () => {
        console.log('button create');
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
        console.log("box will mount");
    }
    update = () => {
        console.log("box update");
    }
}

class Stage extends Entity {
    willMount = () => {
        console.log('Stage did mount');
        console.log(this);
        this.actions.initCount();
    }

    static actions = {
        initCount: (state, actions) => {
            console.log('init count');
            return {count: 0};
        },
        incrementCount: (state, actions) => {
            console.log('incrementCount!!!');
            console.log('state', state(), {count: state().count + 1})
            return {count: state().count + 1}
        }
    }

    create = () => {
        return {
            count: 0
        }
    }
    /*
        render is called after create is all done.
    */
    render() {
        // const {count} = this.state;
        return [
            <Box count={1} />,
            <Button />
        ];
    }
}

register(<Stage />);
