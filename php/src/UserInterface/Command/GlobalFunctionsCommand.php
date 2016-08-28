<?php

namespace PhpIntegrator\UserInterface\Command;

use ArrayAccess;

/**
 * Command that shows a list of global functions.
 */
class GlobalFunctionsCommand extends AbstractCommand
{
    /**
     * @inheritDoc
     */
     protected function process(ArrayAccess $arguments)
     {
         $result = $this->getGlobalFunctions();

         return $this->outputJson(true, $result);
     }

     /**
      * @return array
      */
     public function getGlobalFunctions()
     {
         $result = [];

         foreach ($this->getIndexDatabase()->getGlobalFunctions() as $function) {
             $result[$function['fqcn']] = $this->getFunctionConverter()->convert($function);
         }

         return $result;
     }
}
