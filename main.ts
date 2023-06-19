function spriteStop () {
    spritelist.unshift(playersprite)
    if (led.pointBrightness(2, 0) > 0) {
        gameRunning = 0
    } else {
        playersprite = game.createSprite(2, 0)
        music.playSoundEffect(music.createSoundEffect(WaveShape.Noise, 523, 1, 255, 0, 100, SoundExpressionEffect.Warble, InterpolationCurve.Logarithmic), SoundExpressionPlayMode.InBackground)
    }
}
input.onButtonPressed(Button.A, function () {
    playersprite.change(LedSpriteProperty.X, -1)
})
input.onButtonPressed(Button.B, function () {
    playersprite.change(LedSpriteProperty.X, 1)
})
function removeRow () {
    for (let value of spritelist) {
        if (value.get(LedSpriteProperty.Y) == 4) {
            value.delete()
        }
    }
    music.stopAllSounds()
    music.playSoundEffect(music.createSoundEffect(WaveShape.Noise, 500, 499, 255, 0, 750, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.InBackground)
    delay += -100
    moveRemainingSprites()
}
function checkRow () {
    rowCount = 0
    for (let index = 0; index <= 4; index++) {
        if (led.pointBrightness(index, 4) > 0) {
            rowCount += 1
        }
    }
    if (rowCount == 5) {
        removeRow()
    }
}
function initialise () {
    gameRunning = 1
    delay = 1000
    spritelist = []
    playersprite = game.createSprite(2, 0)
    basic.clearScreen()
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    for (let value of spritelist) {
        value.delete()
    }
    initialise()
    runGame()
})
function moveRemainingSprites () {
    for (let value of spritelist) {
        value.change(LedSpriteProperty.Y, 1)
    }
}
function runGame () {
    while (gameRunning) {
        music.playTone(262, music.beat(BeatFraction.Eighth))
        basic.pause(delay)
        if (playersprite.get(LedSpriteProperty.Y) == 4) {
            spriteStop()
            checkRow()
        } else if (led.pointBrightness(playersprite.get(LedSpriteProperty.X), playersprite.get(LedSpriteProperty.Y) + 1) > 0) {
            spriteStop()
        } else {
            playersprite.change(LedSpriteProperty.Y, 1)
        }
    }
    music.startMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once)
    basic.showString("GAME OVER!")
}
let rowCount = 0
let delay = 0
let gameRunning = 0
let playersprite: game.LedSprite = null
let spritelist: game.LedSprite[] = []
initialise()
runGame()
