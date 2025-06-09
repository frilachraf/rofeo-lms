import { useState } from 'react';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@/components/editor/editor-ui/content-editable';
import { useTranslation } from 'react-i18next';

export function Plugins() {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState(null);
  const { t } = useTranslation();

  const onRef = (_floatingAnchorElem) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <div className="relative">
      {/* toolbar plugins */}
      <div className="relative">
        <RichTextPlugin
          contentEditable={
            <div className="">
              <div className="" ref={onRef}>
                <ContentEditable placeholder={t('editor_placeholder')} />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary} />
        {/* editor plugins */}
      </div>
      {/* actions plugins */}
    </div>
  );
}
