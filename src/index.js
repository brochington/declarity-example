import declarity from 'declarity';

console.log(declarity);
const {Entity, register} = declarity;


class Engine extends Entity {
    static actions = {
        engineTestAction: () => {
            console.log('engineTestAction!!');
        }
    }

    willMount = () => {
        // console.log('willMount Engine');
    }

    didMount = () => {
        // console.log('didMount Engine');
    }
}

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
