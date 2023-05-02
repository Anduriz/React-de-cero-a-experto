import { useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css'

import Modal from 'react-modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCalendarStore, useUiStore } from '../../hooks';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal } = useUiStore();

    const { activeEvent, startSavingEvent } = useCalendarStore();

    const [formSubmitted, setFormSubmitted] = useState( false );    

    const [formValues, setFormValues] = useState({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours( new Date(), 2),
    })

    const titleClass = useMemo(() => {
      if( !formSubmitted ) return '';

      return( formValues.title.length > 0) ? '' : 'is-invalid';

    }, [ formValues.title, formSubmitted ])

    useEffect(() => {

      if( activeEvent !== null){
        setFormValues({ ...activeEvent });
      }
    
    }, [activeEvent])
    


    const onInputChanged = ({target}) => {
      setFormValues({
        ...formValues,
        [target.name]: target.value
      })
    }

    const onDateChanged = ( event, changing ) => {
      setFormValues({
          ...formValues,
          [changing]: event
      })
    }

    const onCloseModal = () => {
        closeDateModal();
    }
  
  const onSubmit = async( event ) => {
    event.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds( formValues.end, formValues.start);
    
    if( isNaN( difference ) || difference <= 0 ){
      Swal.fire('Fechas incorrectas','Revisa las fechas ingresadas','error')
      console.log('Error en fechas');
      return;
    }

    if ( formValues.title.length <= 0) return;

    console.log( formValues );

    // TODO
    await startSavingEvent( formValues );
    // Cerrar modal
    closeDateModal();
    
  }
    

  return (
    <Modal
      isOpen={ isDateModalOpen }
      onRequestClose={ onCloseModal }
      style={ customStyles }
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={ 200 }
    >
    <h1> Nuevo evento </h1>
    <hr />
    <form className="container" onSubmit={ onSubmit }>

        <div className="form-group mb-2">
            <label>Fecha y hora inicio</label>
            {/* <input className="form-control" placeholder="Fecha inicio" /> */}
            <DatePicker 
              minDate={ formValues.start }
              selected={ formValues.start }
              className = "form-control"
              onChange={ (event) => onDateChanged( event, 'start' )}
              dateFormat="Pp"
              showTimeSelect
            />
        </div>

        <div className="form-group mb-2">
            <label>Fecha y hora fin</label>
            {/* <input className="form-control" placeholder="Fecha inicio" /> */}
            <DatePicker 
              selected={ formValues.end }
              className = "form-control"
              onChange={ (event) => onDateChanged( event, 'end' )}
              dateFormat="Pp"
              showTimeSelect
            />
        </div>

        <hr />
        <div className="form-group mb-2">
            <label>Titulo y notas</label>
            <input 
                type="text" 
                className={`form-control ${ titleClass }`}
                placeholder="Título del evento"
                name="title"
                autoComplete="off"
                value = { formValues.title }
                onChange = { onInputChanged }
            />
            <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group mb-2">
            <textarea 
                type="text" 
                className="form-control"
                placeholder="Notas"
                rows="5"
                name="notes"
                value = { formValues.notes }
                onChange = { onInputChanged }
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
            type="submit"
            className="btn btn-outline-primary btn-block"
        >
            <i className="far fa-save"></i>
            <span> Guardar</span>
        </button>

    </form>
    </Modal>
  )
}