import declarity from 'declarity';

console.log(declarity);
const {Entity, register} = declarity;


class Engine extends Entity {

}

class Scene extends Entity {
    yoyo = 'yoyoyoyo'
}

class Camera extends Entity {

}

const stuff = (
    <Engine something="here">
        <Scene myScene="awesome">
            <Camera />
        </Scene>
    </Engine>
)

register();
