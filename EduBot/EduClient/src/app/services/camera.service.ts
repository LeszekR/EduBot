import { Injectable } from '@angular/core';


// ==================================================================================================================
@Injectable()
export class CameraService {

    private static readonly interval = 2000;
    private static readonly prefix = 'data:image/png;base64,';

    private camera;
    private canvas;


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor() {
        this.camera = new (window as any).JpegCamera('#camera', {
            on_ready: () => {
                document.getElementById('camera').style.display = 'none';
                setInterval(() =>
                    this.camera.capture().get_canvas(canvas =>
                        this.canvas = canvas
                    ),
                    CameraService.interval
                );
            }
        });
    }


    // PUBLIC
    // ==============================================================================================================
    makePicture(): string {

        if (this.canvas) {
            return this.canvas.toDataURL().replace(CameraService.prefix, '');
        }

        return null;
    }
}
