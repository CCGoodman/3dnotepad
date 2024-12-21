import { Howl } from 'howler';

export interface RadioStation {
  id: string;
  name: string;
  genre: string;
  url: string;
}

export const radioStations: RadioStation[] = [
  {
    id: 'lofi',
    name: 'Lofi Hip Hop',
    genre: 'Lofi',
    url: 'https://streams.ilovemusic.de/iloveradio17.mp3'
  },
  {
    id: 'classical',
    name: 'Classical Harmony',
    genre: 'Classical',
    url: 'https://live.musopen.org:8085/streamvbr0'
  },
  {
    id: 'dance',
    name: 'Dance',
    genre: '2-Dance',
    url: 'https://streams.ilovemusic.de/ilm_ilove2dance.mp3'
  },
  {
    id: 'love',
    name: 'I Love Radio',
    genre: 'SEAN PAUL & DUA LIPA',
    url: 'https://streams.ilovemusic.de/ilm_iloveradio.mp3'
  },
  {
    id: 'nature',
    name: 'Nature Sounds',
    genre: 'Nature',
    url: 'https://streams.calmradio.com/api/55/128/stream'
  },
  {
    id: 'electronic',
    name: 'Electronic Beats',
    genre: 'Electronic',
    url: 'https://streams.ilovemusic.de/iloveradio2.mp3'
  },
  {
    id: 'greatest',
    name: 'The Greatest Hits',
    genre: 'Greatest Hits',
    url: 'https://streams.ilovemusic.de/ilm_ilovegreatesthits.mp3'
  },
  {
    id: 'piano',
    name: 'Peaceful Piano',
    genre: 'Piano',
    url: 'http://us2.internet-radio.com:8046/listen.pls&t=.m3u'
  },
  {
    id: 'space',
    name: 'Space Ambient',
    genre: 'Space',
    url: 'https://streams.radio.co/s0aa1e6f4a/listen'
  },
  {
    id: 'rain',
    name: 'Rain Sounds',
    genre: 'Nature',
    url: 'https://media.rainymood.com/0.m4a'
  }
];

class RadioPlayer {
  private static instance: RadioPlayer;
  private currentStation: Howl | null = null;
  private volume: number = 0.5;
  private isPlaying: boolean = false;
  private currentStationId: string | null = null;

  private constructor() {}

  static getInstance(): RadioPlayer {
    if (!RadioPlayer.instance) {
      RadioPlayer.instance = new RadioPlayer();
    }
    return RadioPlayer.instance;
  }

  play(station: RadioStation): void {
    if (this.currentStation) {
      this.currentStation.stop();
    }

    this.currentStation = new Howl({
      src: [station.url],
      html5: true,
      volume: this.volume,
      format: ['mp3']
    });

    this.currentStation.play();
    this.isPlaying = true;
    this.currentStationId = station.id;
  }

  stop(): void {
    if (this.currentStation) {
      this.currentStation.stop();
      this.isPlaying = false;
    }
  }

  setVolume(volume: number): void {
    this.volume = volume;
    if (this.currentStation) {
      this.currentStation.volume(volume);
    }
  }

  getVolume(): number {
    return this.volume;
  }

  isCurrentlyPlaying(): boolean {
    return this.isPlaying;
  }

  getCurrentStationId(): string | null {
    return this.currentStationId;
  }
}

export const radioPlayer = RadioPlayer.getInstance();