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
                this.hideSlot();
                document.getElementById('camera').style.display = 'none';
                setInterval(() =>
                    this.camera.capture().get_canvas(canvas =>
                        this.canvas = canvas
                    ),
                    CameraService.interval
                );
            },
            on_error: this.hideSlot,
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


    // PRIVATE
    // ==============================================================================================================
    private hideSlot(): void {

        document.getElementById('camera').style.display = 'none';
    }
}
