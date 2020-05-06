import * as React from 'react';
import {CancelButton} from "../CancelButton";
import {
    ICommentCreate,
    useAnnotationMutationsContext
} from "../../AnnotationMutationsContext";
import {useAnnotationActiveInputContext} from "../../AnnotationActiveInputContext";
import {EditComment2} from './EditComment2';
import {IDocAnnotation} from "../../DocAnnotation";

interface IProps {
    readonly parent: IDocAnnotation;
}

export const CreateComment2 = React.memo((props: IProps) => {

    const annotationInputContext = useAnnotationActiveInputContext();
    const annotationMutations = useAnnotationMutationsContext();

    const cancelButton = <CancelButton onClick={() => annotationInputContext.setActive('none')}/>;
    // FIXME try to use MUI Fade here I think.

    if (annotationInputContext.active !== 'comment') {
        return null;
    }

    const handleComment = React.useCallback((body: string) => {

        const mutation: ICommentCreate = {
            type: 'create',
            body,
            parent: props.parent
        };

        annotationMutations.onComment(mutation);

    }, []);

    return (
        <EditComment2 cancelButton={cancelButton} onComment={handleComment}/>
    );

});